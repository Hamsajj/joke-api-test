import { ANALYZE_TYPE, AnalyzeResult, Joke } from './jokes.model';
import { fetchJokes, JokeApiParam } from '../utils';

export interface IJokeService {
  getJokes(amount: number, type: 'single' | 'twopart' | 'any'): Promise<Joke[]>;

  analyzeJokes(jokes: Joke[]): Promise<AnalyzeResult[]>;
}

export class JokeService implements IJokeService {
  async getJokes(
    amount: number,
    type: 'single' | 'twopart' | 'any',
  ): Promise<Joke[]> {
    const apiParams: JokeApiParam = {
      amount: amount,
      type: type && type != 'any' ? type : undefined,
    };

    return fetchJokes(apiParams);
  }

  async analyzeJokes(jokes: Joke[]): Promise<AnalyzeResult[]> {
    /* there is tradeoff between readability and performance here
      we can have one big for loop over jokes and calculate multiple metrics in the same loop
      but we also can treat each metric separately and thus looping over jokes multiple times
      but because metrics are limited and jokes are at most 10, performance is not going to be an issue
      and I optimized for readablity
     */
    const fullJokeLength: string = jokes
      .map(this.getJokeText)
      .join('')
      .toLowerCase();
    const fullJokeLengthWithoutWhiteSpace = fullJokeLength.replace(/\s/g, '');
    // removes whitespaces to get third letter
    const letterToLookFor =
      this.getJokeText(jokes[jokes.length - 1])?.replace(/\s/g, '')[2] || '';
    return Promise.all([
      this.analyzeTotalNumberOfChars(fullJokeLength),
      this.analyzeLetterOccurrence(
        fullJokeLengthWithoutWhiteSpace,
        letterToLookFor,
      ),
      this.analyzeMostCommonLetter(fullJokeLengthWithoutWhiteSpace),
      this.analyzeCategories(jokes),
    ]);
  }

  private analyzeTotalNumberOfChars(fullJokeText: string): AnalyzeResult {
    return new AnalyzeResult(
      'Number of characters in all jokes',
      fullJokeText.length.toString(),
      ANALYZE_TYPE.TOTAL_CHARS,
    );
  }

  /**
   * finds out which letter is repeated the most
   * @param fullJokeText
   * @private
   */
  private analyzeMostCommonLetter(fullJokeText: string): AnalyzeResult {
    const letterCountsMap: { [key: string]: number } = {};
    let mostCommonLetter = '';

    for (const char of fullJokeText) {
      if (char in letterCountsMap) {
        letterCountsMap[char] += 1;
      } else {
        letterCountsMap[char] = 1;
      }
      if (mostCommonLetter) {
        if (letterCountsMap[char] > letterCountsMap[mostCommonLetter]) {
          mostCommonLetter = char;
        }
      } else {
        mostCommonLetter = char;
      }
    }
    return new AnalyzeResult(
      'Most common letter',
      `'${mostCommonLetter}' with ${letterCountsMap[
        mostCommonLetter
      ].toString()} occurrence`,
      ANALYZE_TYPE.COMMON_LETTER,
    );
  }

  /**
   * return analyzeResult that demonstrate the occurrences of the letterToLookFor
   * @param fullJokeText
   * @param letterToLookFor
   * @private
   */
  private analyzeLetterOccurrence(
    fullJokeText: string,
    letterToLookFor: string,
  ) {
    let count = 0;
    if (fullJokeText && letterToLookFor) {
      count = fullJokeText.split(letterToLookFor).length - 1;
    }
    return new AnalyzeResult(
      `Third letter of last joke`,
      `'${letterToLookFor}' repeated ${count} times`,
      ANALYZE_TYPE.LETTER_COUNT,
    );
  }

  /**
   * calculates the percentage of the most common category
   * if all of them are repeated the same time, shows this in the result
   * @param jokes
   * @private
   */
  private analyzeCategories(jokes: Joke[]): AnalyzeResult {
    const categories: string[] = jokes.map((joke) => joke.category);
    const categoryCountMap: { [category: string]: number } = {};
    let maxCategory = categories[0];
    categories.forEach((category) => {
      if (category in categoryCountMap) {
        categoryCountMap[category] += 1;
      } else {
        categoryCountMap[category] = 1;
      }
      if (categoryCountMap[category] > categoryCountMap[maxCategory]) {
        maxCategory = category;
      }
    });
    const maxRepetition = categoryCountMap[maxCategory];
    const commonCategories: Set<string> = new Set();
    for (const category of categories) {
      if (categoryCountMap[category] === maxRepetition) {
        commonCategories.add(category);
      }
    }
    const mostCommonPercentage = (maxRepetition / categories.length) * 100;
    const analyzeResultValue = `${
      commonCategories.size > 1 ? 'draw between ' : ''
    }${Array.from(commonCategories).join(
      ', ',
    )} with ${mostCommonPercentage}% of jokes`;
    return new AnalyzeResult(
      'Dominant category',
      analyzeResultValue,
      ANALYZE_TYPE.DOMINANT_CATEGORY,
    );
  }

  private getJokeText(joke: Joke): string {
    if (joke.type === 'single') {
      return joke.joke || '';
    }
    let fullJokeText = '';
    if (joke.setup) {
      fullJokeText += joke.setup.trim();
    }
    if (joke.delivery) {
      fullJokeText += ' ' + joke.delivery.trim();
    }
    return fullJokeText;
  }
}
