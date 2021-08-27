interface ProductI {
    key: string,
    bodyType: string,
    title: string,
    modelType: string,
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