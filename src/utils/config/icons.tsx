export const ICONS = {
  menuOpen: (props?: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      className="svg1"
      {...props}
    >
      <path
        fill="none"
        stroke="rgb(234, 171, 83)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3 6.001h18m-18 6h18m-18 6h18"
      />
    </svg>
  ),
  close: (props?: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" {...props}>
      <path
        fill="rgb(234, 171, 83)"
        d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275L12 13.4Z"
      />
    </svg>
  ),
  telegram: (props?: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 256 256" {...props}>
      <defs>
        <linearGradient id="logosTelegram0" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#2aabee" />
          <stop offset="100%" stopColor="#229ed9" />
        </linearGradient>
      </defs>
      <path
        fill="url(#logosTelegram0)"
        d="M128 0C94.06 0 61.48 13.494 37.5 37.49A128.04 128.04 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51s-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0"
      />
      <path
        fill="#fff"
        d="M57.94 126.648q55.98-24.384 74.64-32.152c35.56-14.786 42.94-17.354 47.76-17.441c1.06-.017 3.42.245 4.96 1.49c1.28 1.05 1.64 2.47 1.82 3.467c.16.996.38 3.266.2 5.038c-1.92 20.24-10.26 69.356-14.5 92.026c-1.78 9.592-5.32 12.808-8.74 13.122c-7.44.684-13.08-4.912-20.28-9.63c-11.26-7.386-17.62-11.982-28.56-19.188c-12.64-8.328-4.44-12.906 2.76-20.386c1.88-1.958 34.64-31.748 35.26-34.45c.08-.338.16-1.598-.6-2.262c-.74-.666-1.84-.438-2.64-.258c-1.14.256-19.12 12.152-54 35.686c-5.1 3.508-9.72 5.218-13.88 5.128c-4.56-.098-13.36-2.584-19.9-4.708c-8-2.606-14.38-3.984-13.82-8.41c.28-2.304 3.46-4.662 9.52-7.072"
      />
    </svg>
  ),
  savedMenu: (props?: any) => (
    <svg
      width="157"
      height="130"
      viewBox="0 0 157 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M136.636 18.1759C124.326 6.77927 104.362 6.77927 92.0512 18.1759L81.8349 27.6272C80.8554 28.5324 79.5269 29.0381 78.1463 29.0381C76.7657 29.0381 75.4374 28.5324 74.4632 27.6272L64.2415 18.1759C51.9308 6.77927 31.9671 6.77927 19.6565 18.1759C7.34065 29.5678 7.34065 48.047 19.6565 59.4437C19.7034 59.487 19.7556 59.5352 19.8025 59.5786L78.1463 118.083L136.49 59.5786C136.537 59.5352 136.589 59.487 136.636 59.4437C148.952 48.047 148.952 29.5678 136.636 18.1759ZM84.6795 11.3678C101.059 -3.78926 127.623 -3.78926 144.008 11.3678C160.362 26.5008 160.387 51.0178 144.086 66.1749L81.9754 128.45C80.9908 129.437 79.5999 130 78.1463 130C76.6928 130 75.3019 129.437 74.3172 128.45L12.2066 66.1749C-4.09471 51.0178 -4.06891 26.5008 12.2845 11.3678C28.6692 -3.78926 55.2337 -3.78926 71.6132 11.3678L78.1463 17.4104L84.6795 11.3678Z"
        fill="rgb(234, 171, 83)"
      />
    </svg>
  ),
  flower: (props?: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 256 256" {...props}>
      <path
        fill="rgb(234, 171, 83)"
        d="M244.1 122.63a13.56 13.56 0 0 0-8.3-6.4a72.6 72.6 0 0 0-24.17-2c4.67-20.63 1.62-36.91-1.45-46.4a14.16 14.16 0 0 0-16.48-9.53a84.2 84.2 0 0 0-29.76 13.11a92.6 92.6 0 0 0-27.52-34.6a14 14 0 0 0-16.85 0a92.7 92.7 0 0 0-27.51 34.6A84.2 84.2 0 0 0 62.29 58.3a14.15 14.15 0 0 0-16.47 9.54c-3.07 9.49-6.12 25.77-1.45 46.4a72.6 72.6 0 0 0-24.17 2a13.56 13.56 0 0 0-8.3 6.4a14 14 0 0 0-1.4 10.74C13.81 145.66 24 169 54.92 187.51S113.29 206 128 206s42.12 0 73.06-18.49s41.11-41.85 44.42-54.14a14 14 0 0 0-1.38-10.74M168.48 82.9A73.1 73.1 0 0 1 196.22 70a2.2 2.2 0 0 1 2.54 1.5c3.94 12.22 7.81 37.5-10.59 69.5a129.8 129.8 0 0 1-28 33.37C167.85 161 174 142.93 174 119.17a116.1 116.1 0 0 0-5.52-36.27M57.24 71.53A2.2 2.2 0 0 1 59.78 70a73.1 73.1 0 0 1 27.74 12.9A116.1 116.1 0 0 0 82 119.17c0 23.76 6.15 41.85 13.81 55.17a129.6 129.6 0 0 1-28-33.37C49.43 109 53.3 83.72 57.24 71.53m3.84 105.67c-27.3-16.31-36.15-36.42-39-47a2.08 2.08 0 0 1 .21-1.61a1.7 1.7 0 0 1 1-.8A62.2 62.2 0 0 1 48 126.72A126 126 0 0 0 57.43 147a141 141 0 0 0 41 44.72a114.8 114.8 0 0 1-37.35-14.52M128 192.86c-8.68-6.2-34-28.2-34-73.69c0-43.36 22.94-65.34 32.8-72.78a2 2 0 0 1 2.4 0c9.86 7.44 32.8 29.42 32.8 72.78c0 45.77-25.19 67.5-34 73.69m105.9-62.62c-2.85 10.54-11.7 30.65-39 47a114.8 114.8 0 0 1-37.38 14.47a141 141 0 0 0 41-44.72a126 126 0 0 0 9.48-20.27a62.2 62.2 0 0 1 24.73 1.11a1.7 1.7 0 0 1 1 .8a2.08 2.08 0 0 1 .19 1.61Z"
      />
    </svg>
  ),
  rabbit: (props?: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 24 24" {...props}>
      <path
        fill="rgb(234, 171, 83)"
        d="M7.75 19a2.75 2.75 0 0 1-2.745-2.582L5 16.25V15a3 3 0 1 1 2.562-4.56a4.5 4.5 0 0 1 1.68-.432L9.5 10h4l.248.007l.245.02l.127.017l.11-.167l.131-.178l-1.777-1.777c-.7-.7-.773-1.788-.22-2.57l.103-.134l.117-.128c.74-.74 1.918-.78 2.705-.117l.127.117l5.412 5.413a4 4 0 0 1-2.642 6.824l-.225.004l-.182-.007l-.026.064a2.75 2.75 0 0 1-2.138 1.588l-.192.019l-.174.005zm6.605-12.849a.502.502 0 0 0-.768.641l.058.07l2.808 2.808l-.638.642q-.316.317-.523.696l-.097.192l-.266.584l-.618-.173a3 3 0 0 0-.604-.104l-.208-.007H9.5c-.7 0-1.343.24-1.853.64l-.143.12l-.165.16l-.093.1l-.111.134l-.121.167l-.042.064q-.062.095-.115.196l-.058.112l-.062.137l-.034.084l-.051.142l-.055.184a3 3 0 0 0-.062.297l-.011.083l-.018.189l-.006.191v1.75c0 .648.492 1.18 1.122 1.244l.128.006h4.251v-.246a1.25 1.25 0 0 0-1.121-1.244l-.128-.006h-1a.75.75 0 0 1-.102-1.494l.102-.006h1a2.75 2.75 0 0 1 2.745 2.582l.005.168l-.001.246h1.749c.591 0 1.094-.414 1.218-.975l.02-.122l.1-.84l.822.198a2.5 2.5 0 0 0 2.48-4.067l-.122-.13zM5 10.501a1.5 1.5 0 0 0-.145 2.992l.145.006l.114-.005l.005-.025q.053-.224.126-.438l.097-.255l.106-.236l.057-.113l.13-.234l.088-.14l.145-.21l.074-.098l.108-.134l.129-.147l.15-.157c-.21-.4-.59-.69-1.037-.778l-.151-.022z"
      />
    </svg>
  ),
  goblet: (props?: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="65"
      height="65"
      viewBox="0 0 1024 1024"
      {...props}
    >
      <path
        fill="rgb(234, 171, 83)"
        d="M544 638.4V896h96a32 32 0 1 1 0 64H384a32 32 0 1 1 0-64h96V638.4A320 320 0 0 1 192 320c0-85.632 21.312-170.944 64-256h512c42.688 64.32 64 149.632 64 256a320 320 0 0 1-288 318.4M256 320a256 256 0 1 0 512 0c0-78.592-12.608-142.4-36.928-192h-434.24C269.504 192.384 256 256.256 256 320"
      />
    </svg>
  ),
  lamp: (props?: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 16 16" {...props}>
      <g fill="rgb(234, 171, 83)">
        <path
          fillRule="evenodd"
          d="M5.04.303A.5.5 0 0 1 5.5 0h5c.2 0 .38.12.46.303l3 7a.5.5 0 0 1-.363.687h-.002q-.225.044-.45.081a33 33 0 0 1-4.645.425V13.5a.5.5 0 1 1-1 0V8.495a33 33 0 0 1-4.645-.425q-.225-.036-.45-.08h-.003a.5.5 0 0 1-.362-.688l3-7ZM3.21 7.116A31 31 0 0 0 8 7.5a31 31 0 0 0 4.791-.384L10.171 1H5.83z"
        />
        <path d="M6.493 12.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.3 1.3 0 0 0-.37.265a.3.3 0 0 0-.052.075l-.001.004l-.004.01V14l.002.008l.016.033a.6.6 0 0 0 .145.15c.165.13.435.27.813.395c.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.6.6 0 0 0 .146-.15l.015-.033L12 14v-.004a.3.3 0 0 0-.057-.09a1.3 1.3 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977c-.29.228-.68.413-1.116.558c-.878.293-2.059.465-3.34.465s-2.462-.172-3.34-.465c-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243c.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411" />
      </g>
    </svg>
  ),
  christmas: (props?: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 24 24" {...props}>
      <g fill="rgb(234, 171, 83)" fillRule="evenodd">
        <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
        <path
          fill="rgb(234, 171, 83)"
          d="M12 2a1 1 0 0 1 .894.553l.804 1.607A9 9 0 1 1 3 13a9 9 0 0 1 7.302-8.84l.804-1.607A1 1 0 0 1 12 2M5.013 12.563a7 7 0 0 0 .488 3.045q.412.131.45.14c1.659.412 3.479.248 5.22-.895l.248-.17c2.35-1.679 4.853-1.941 7.112-1.38q.258.064.456.127a7 7 0 0 0-.492-3.045l-.446-.141c-1.658-.412-3.478-.248-5.22.896l-.248.17c-2.349 1.678-4.852 1.94-7.112 1.38a8 8 0 0 1-.456-.127m.415-1.98q.482.156.523.166c1.659.411 3.479.247 5.22-.896l.248-.17c1.814-1.296 3.72-1.748 5.535-1.628a7.003 7.003 0 0 0-11.526 2.53m13.146 4.827l-.525-.166c-1.658-.412-3.478-.248-5.22.896l-.248.17c-1.817 1.298-3.726 1.749-5.543 1.627a7.003 7.003 0 0 0 11.536-2.527"
        />
      </g>
    </svg>
  ),
  chess: (props?: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 20 20" {...props}>
      <path
        fill="rgb(234, 171, 83)"
        d="M10 3a1 1 0 0 1 1-1h.5c.385 0 .737.145 1.002.384A1.5 1.5 0 0 1 13.506 2h.99c.385 0 .737.145 1.003.384A1.5 1.5 0 0 1 16.5 2h.5a1 1 0 0 1 1 1v2.5a2.5 2.5 0 0 1-1.95 2.44c.284 4.043 1.7 6.585 2.187 7.35c.16.252.263.553.263.877v.333A1.5 1.5 0 0 1 17 18h-5.476a2.44 2.44 0 0 0 .435-1H17a.5.5 0 0 0 .5-.5v-.333a.64.64 0 0 0-.107-.34c-.573-.9-2.155-3.774-2.369-8.304A.5.5 0 0 1 15.518 7A1.5 1.5 0 0 0 17 5.5V3h-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 1-1 .003V4.5l-.005-1.002a.5.5 0 0 0-.5-.498h-.99a.5.5 0 0 0-.5.498L13 4.502a.5.5 0 0 1-1-.003v-1a.5.5 0 0 0-.5-.5H11v2.5A1.5 1.5 0 0 0 12.482 7a.5.5 0 0 1 .494.523c-.158 3.34-1.06 5.779-1.752 7.191a3 3 0 0 0-.203-.188a4 4 0 0 1-.55-.558c.588-1.278 1.288-3.315 1.479-6.029A2.505 2.505 0 0 1 10 5.5zM4.5 8a2 2 0 1 1 3.6 1.2a.5.5 0 0 0 .4.8H9a.5.5 0 0 1 0 1H7.893a.5.5 0 0 0-.496.56c.302 2.47 1.609 3.888 2.34 4.5c.175.146.263.33.263.489a.45.45 0 0 1-.451.451H3.45a.45.45 0 0 1-.45-.451c0-.16.088-.343.262-.489c.732-.612 2.04-2.03 2.341-4.5a.5.5 0 0 0-.496-.56H4a.5.5 0 0 1 0-1h.5a.5.5 0 0 0 .4-.8A2 2 0 0 1 4.5 8m2-3a3 3 0 0 0-2.817 4.034A1.5 1.5 0 0 0 4 12h.52c-.372 1.798-1.353 2.836-1.9 3.293c-.346.29-.62.736-.62 1.256C2 17.35 2.65 18 3.451 18H9.55c.8 0 1.45-.65 1.45-1.451c0-.52-.274-.966-.62-1.256c-.547-.457-1.528-1.495-1.9-3.293H9a1.5 1.5 0 0 0 .317-2.966A3 3 0 0 0 6.5 5"
      />
    </svg>
  ),
  vip: (props?: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="rgb(234, 171, 83)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 5h18M3 19h18M4 9l2 6h1l2-6m3 0v6m4 0V9h2a2 2 0 1 1 0 4h-2"
      />
    </svg>
  ),
};
