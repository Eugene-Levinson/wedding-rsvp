interface Config {
    port: number,
    dev_port: number,
    ssl_port: number,
    dev_ssl_port: number,
    DB_HOST: string,
    DB_USER: string,
    DB_PASS: string,
    DB_NAME: string,
    SSL_KEY: string,
    SSL_CERT: string,
    base_url: string
}

export let config: Config = {
    port: 7580,
    ssl_port: 7443,
    dev_ssl_port: 4433,
    dev_port: 3030,
    DB_HOST: process.env.DB_HOST as unknown as string,
    DB_USER: process.env.DB_USER as unknown as string,
    DB_PASS: process.env.DB_PASS as unknown as string,
    DB_NAME: process.env.DB_NAME as unknown as string,
    SSL_KEY: "",
    SSL_CERT: "",
    base_url: "arvp.uk"
}