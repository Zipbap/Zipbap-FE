// eslint-config-import.js
import importPlugin from 'eslint-plugin-import';

import path from 'path';

export default {
  plugins: {
    import: importPlugin,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: path.resolve(process.cwd(), 'tsconfig.json'),
      },
    },
  },
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          // 외부 패키지
          'external',
          // Node.js 내장 모듈
          'builtin',
          // 내부 모듈
          'internal',
          // 상위 디렉토리
          'parent',
          // 같은 디렉토리
          'sibling',
          // index 파일
          'index',
          // 객체 import
          'object',
          // 타입 import
          'type',
        ],
        // NOTE: FSD의 단방향 의존성을 유지하기 위한 설정
        pathGroups: [
          // another alias
          { pattern: '@/**', group: 'internal', position: 'before' },
          // FSD Layer
          { pattern: '@app/**', group: 'internal', position: 'after' },
          { pattern: '@pages/**', group: 'internal', position: 'after' },
          { pattern: '@widgets/**', group: 'internal', position: 'after' },
          { pattern: '@features/**', group: 'internal', position: 'after' },
          { pattern: '@entities/**', group: 'internal', position: 'after' },
          { pattern: '@shared/**', group: 'internal', position: 'after' },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc' },
      },
    ],
    // import문은 최상단에 위치
    'import/first': 'error',

    // import 이후 새 라인 추가
    'import/newline-after-import': 'error',

    // export 구문은 파일의 마지막에 위치해야 함
    'import/exports-last': 'off',

    // 존재하지 않는 모듈 import 금지
    'import/no-unresolved': 'error',

    // 같은 모듈을 두 번 import 금지
    'import/no-duplicates': 'error',

    // import 순환 참조 금지
    'import/no-cycle': 'error',

    // 자기 자신 import 금지
    'import/no-self-import': 'error',

    // 불필요한 경로 세그먼트 금지 (./foo/index → ./foo)
    'import/no-useless-path-segments': 'error',
  },
};
