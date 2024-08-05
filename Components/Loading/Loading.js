import Head from "next/head";

export default function Loading() {
  return (
    <>
      <Head>
        <title>Loading....</title>
      </Head>
      <div className="center">
        <div className="loader">
          <div className="inner"></div>
          <div className="inner"></div>
        </div>
      </div>
      <style jsx>{`
        .center {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f0f2f5;
        }

        .loader {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 80px;
          height: 80px;
        }

        .loader .inner {
          position: absolute;
          border: 4px solid #3f51b5;
          opacity: 1;
          border-radius: 50%;
          animation: loader 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }

        .loader .inner:nth-child(2) {
          animation-delay: -0.5s;
        }

        @keyframes loader {
          0%,
          100% {
            top: 36px;
            left: 36px;
            width: 0;
            height: 0;
            opacity: 0;
          }
          50% {
            top: 0;
            left: 0;
            width: 72px;
            height: 72px;
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
