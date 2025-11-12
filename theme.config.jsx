export default {
  logo: <span>부동산 매물관리 시스템 매뉴얼</span>,
  project: {
    link: 'https://github.com/realsoftnext/realhome_manual'
  },
  docsRepositoryBase: 'https://github.com/realsoftnext/realhome_manual/tree/main',
  footer: {
    text: '부동산 매물관리 시스템 사용자 매뉴얼'
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – 부동산 매물관리 시스템'
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="부동산 매물관리 시스템 매뉴얼" />
      <meta property="og:description" content="부동산 중개업소를 위한 매물관리 시스템 사용자 매뉴얼" />
      <style>{`
        @font-face {
          font-family: 'Paperozi';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-1Thin.woff2') format('woff2');
          font-weight: 100;
          font-display: swap;
        }
        @font-face {
          font-family: 'Paperozi';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-2ExtraLight.woff2') format('woff2');
          font-weight: 200;
          font-display: swap;
        }
        @font-face {
          font-family: 'Paperozi';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-3Light.woff2') format('woff2');
          font-weight: 300;
          font-display: swap;
        }
        @font-face {
          font-family: 'Paperozi';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-4Regular.woff2') format('woff2');
          font-weight: 400;
          font-display: swap;
        }
        @font-face {
          font-family: 'Paperozi';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-5Medium.woff2') format('woff2');
          font-weight: 500;
          font-display: swap;
        }
        @font-face {
          font-family: 'Paperozi';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-6SemiBold.woff2') format('woff2');
          font-weight: 600;
          font-display: swap;
        }
        @font-face {
          font-family: 'Paperozi';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-7Bold.woff2') format('woff2');
          font-weight: 700;
          font-display: swap;
        }
        @font-face {
          font-family: 'Paperozi';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-8ExtraBold.woff2') format('woff2');
          font-weight: 800;
          font-display: swap;
        }
        @font-face {
          font-family: 'Paperozi';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-9Black.woff2') format('woff2');
          font-weight: 900;
          font-display: swap;
        }
        * {
          font-family: 'Paperozi', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', sans-serif !important;
        }
      `}</style>
    </>
  )
}
