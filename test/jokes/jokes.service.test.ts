import { JokeService } from '../../src/jokes/jokes.service';
import { singleJokeMock, twoPartJokeMock } from '../mocks/jokes.mock';
import { ANALYZE_TYPE, AnalyzeResult, Joke } from '../../src/jokes/jokes.model';

describe('joke service', () => {
  let service: JokeService;
  beforeEach(() => {
    service = new JokeService();
  });
  describe('analyze jokes', () => {
    describe('should return valid analyze results', () => {
      const testCases: {
        name: string;
        input: Joke[];
        expectedTotalChar: string;
        expectedLetterCount: string;
        expectedCommonLetter: string;
        expectedDominantCategory: string;
      }[] = [
        {
          name: 'single joke',
          input: [Object.assign(new Joke(), singleJokeMock)],
          expectedTotalChar: '7',
          expectedLetterCount: `'o' repeated 1 times`,
          expectedCommonLetter: `'a' with 2 occurrence`,
          expectedDominantCategory: 'category Pun with 100% of jokes',
        },
        {
          name: 'twopart joke',
          input: [Object.assign(new Joke(), twoPartJokeMock)],
          expectedTotalChar: '7',
          expectedLetterCount: `'o' repeated 1 times`,
          expectedCommonLetter: `'a' with 2 occurrence`,
          expectedDominantCategory: 'category Programming with 100% of jokes',
        },
        {
          name: 'twopart and single together joke',
          input: [
            Object.assign(new Joke(), twoPartJokeMock),
            Object.assign(new Joke(), singleJokeMock),
          ],
          expectedTotalChar: '14',
          expectedLetterCount: `'o' repeated 2 times`,
          expectedCommonLetter: `'a' with 4 occurrence`,
          expectedDominantCategory:
            'draw between categories Programming, Pun with 50% of jokes',
        },
      ];

      testCases.forEach((tt) => {
        it(tt.name, () => {
          const result: AnalyzeResult[] = service.analyzeJokes(tt.input);
          expect(result).toBeTruthy();
          expect(Array.isArray(result)).toBe(true);
          expect(result.length).toEqual(4);
          result.forEach((analyzeRes) => {
            expect(analyzeRes).toEqual(
              expect.objectContaining({
                description: expect.any(String),
                value: expect.any(String),
                type: expect.any(Number),
              }),
            );
            if (analyzeRes.type === ANALYZE_TYPE.TOTAL_CHARS) {
              expect(analyzeRes.value).toEqual(tt.expectedTotalChar);
            }
            if (analyzeRes.type === ANALYZE_TYPE.LETTER_COUNT) {
              expect(analyzeRes.value).toEqual(tt.expectedLetterCount);
            }
            if (analyzeRes.type === ANALYZE_TYPE.COMMON_LETTER) {
              expect(analyzeRes.value).toEqual(tt.expectedCommonLetter);
            }
            if (analyzeRes.type === ANALYZE_TYPE.DOMINANT_CATEGORY) {
              expect(analyzeRes.value).toEqual(tt.expectedDominantCategory);
            }
          });
        });
      });
    });
  });
});
