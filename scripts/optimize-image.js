import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputPath = join(__dirname, '../src/lib/assets/PhotoFrancoisProvencher.JPG');
const outputPath = join(__dirname, '../static/photo-profile.jpg');

async function optimizeImage() {
	try {
		await sharp(inputPath)
			.resize(800, 800, {
				fit: 'cover',
				position: 'center'
			})
			.jpeg({ quality: 85, progressive: true })
			.toFile(outputPath);

		console.log('✅ Photo optimisée avec succès !');
		console.log(`   Fichier créé : ${outputPath}`);
		console.log('   Dimensions : 800x800px');
	} catch (error) {
		console.error('❌ Erreur lors de l\'optimisation :', error);
	}
}

optimizeImage();
