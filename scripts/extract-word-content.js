import mammoth from 'mammoth';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cvPath = join(__dirname, '../static/CV_François-Provencher_Innovitech Sept 2024.docx');
const projectsPath = join(__dirname, '../static/Réalisations_FP_Innovitech 2025-06-10b.docx');

async function extractCV() {
	try {
		console.log('📄 Extraction du CV...');
		const result = await mammoth.extractRawText({ path: cvPath });
		const text = result.value;

		// Sauvegarder dans un fichier texte pour analyse
		const outputPath = join(__dirname, '../extracted-cv.txt');
		writeFileSync(outputPath, text, 'utf-8');

		console.log('✅ CV extrait avec succès !');
		console.log(`   Fichier créé : ${outputPath}`);
		console.log(`   Longueur : ${text.length} caractères`);
		console.log('\n--- Aperçu (500 premiers caractères) ---');
		console.log(text.substring(0, 500));

		return text;
	} catch (error) {
		console.error('❌ Erreur lors de l\'extraction du CV :', error.message);
	}
}

async function extractProjects() {
	try {
		console.log('\n📄 Extraction des réalisations...');
		const result = await mammoth.extractRawText({ path: projectsPath });
		const text = result.value;

		// Sauvegarder dans un fichier texte pour analyse
		const outputPath = join(__dirname, '../extracted-projects.txt');
		writeFileSync(outputPath, text, 'utf-8');

		console.log('✅ Réalisations extraites avec succès !');
		console.log(`   Fichier créé : ${outputPath}`);
		console.log(`   Longueur : ${text.length} caractères`);
		console.log('\n--- Aperçu (500 premiers caractères) ---');
		console.log(text.substring(0, 500));

		return text;
	} catch (error) {
		console.error('❌ Erreur lors de l\'extraction des réalisations :', error.message);
	}
}

async function main() {
	console.log('🚀 Extraction du contenu des documents Word\n');

	await extractCV();
	await extractProjects();

	console.log('\n✨ Extraction terminée !');
	console.log('Les fichiers texte ont été créés à la racine du projet.');
	console.log('Vous pouvez maintenant les utiliser pour remplir les fichiers de données.');
}

main();
