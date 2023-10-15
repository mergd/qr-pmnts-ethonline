# pmnts Dapp

pmnts dapp allows for people to create and send payments on a slick PWA interface.

This is a template progressive web app (PWA) built with [Privy](https://www.privy.io/), [Viem](https://viem.sh/), [NextPWA](https://www.npmjs.com/package/next-pwa), and [TailwindCSS](https://tailwindcss.com/). All transactions are sent on the [Base](https://base.org/) Goerli testnet.

## Points of Interest

You may find the following code snippets within this repo useful:

#### `public/manifest.json`

Setting up your PWA's manifest, which controls how it appears when installed on a user device.

#### `pages/_app.tsx`

Configuring your `PrivyProvider` component with your login methods, app ID, embedded wallet configuration, and more.

#### `pages/index.tsx`

Using Privy's `login` method and prompting users to install your PWA using the `beforeinstallprompt` event (Android/Chrome-only).

#### `pages/dashboard.tsx`

Using Privy's `user` object and various linking methods (`linkApple`, `linkGoogle`, `linkPhone`).

#### `pages/embedded-wallet.tsx`

Using Privy's embedded wallet to sign messages, send transactions (using viem!), and export the user's private key.

#### `pages/load-assets.tsx`

An example of a page you might have in your PWA to allow users to connect an external wallet, from which they can transfer assets to their embedded wallet.
