interface ProductI {
    carType: string,
    title: string,
    engineType: string,
    image: {
        src: string,
        alt: string
    },
    links: Array<{
        text: string,
        href: string
    }>
}

export default ProductI;