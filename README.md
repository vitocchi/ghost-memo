# ghost-memo
memo DApp sample of [ghost](https://github.com/vitocchi/ghost)

## Rust

https://doc.rust-lang.org/book/ch01-01-installation.html

## Enigma discovery-cli

I recommend Node.js v10.16.0.

`npm install -g @enigmampc/discovery-cli`

After clone this repository, isntall the project dependencies:

```
npm install
```

Copy .env.example to .env, and change `BUILD_CONTRACTS_PATH` 

start enigma discovery:

```
discovery start
```

open a new shell

## ghost-memo

```
discovery migrate
```

You can launch Mocha tests if you want:

```
discovery test
```

## frontend

```
cd client
npm install
npm run start
```
