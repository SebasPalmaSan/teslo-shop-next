import prisma from "../lib/prisma";
import { initialData } from "./seed";

async function main() {
    // 1.Borrar registros previos
    // await Promise.all([
       await prisma.productImage.deleteMany();
       await prisma.product.deleteMany();
       await prisma.category.deleteMany();
    // ]);

    const { categories, products } = initialData;

    // Categorías
    const categoriesData = categories.map(category => ({ name: category }));

    await prisma.category.createMany({
        data: categoriesData
    });

    const categoriesDB = await prisma.category.findMany();

    const categoriesMap = categoriesDB.reduce((map, category) => {
        map[category.name.toLowerCase()] = category.id;
        return map;
    }, {} as Record<string, string>);

    // Productos
    for (const product of products) {
        const { type, images, ...rest } = product;

        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        });

        // Imágenes
        const imagesData = images.map(image => ({ url: image, productId: dbProduct.id }));

        await prisma.productImage.createMany({
            data: imagesData
        });
    }

    console.log('seed ejecutado correctamente');
}

if (process.env.NODE_ENV !== 'production') {
    main().catch(error => {
        console.error('Error durante la ejecución del seed:', error);
    });
}
