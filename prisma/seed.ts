import { PrismaClient } from '@prisma/client';
import { parse } from 'csv-parse/sync';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
	// const alice = await prisma.user.upsert({
	// 	where: { email: 'alice@prisma.io' },
	// 	update: {},
	// 	create: {
	// 		email: 'alice@prisma.io',
	// 		name: 'Alice',
	// 		posts: {
	// 			create: {
	// 				title: 'Check out Prisma with Next.js',
	// 				content: 'https://www.prisma.io/nextjs',
	// 				published: true,
	// 			},
	// 		},
	// 	},
	// });
	const federalDistrictsCsv = fs.readFileSync('./seed/federalDistricts.csv', 'utf8');
	const federalDistricts = parse(federalDistrictsCsv, {
		columns: true,
		skip_empty_lines: true,
		cast: true,
	});

	const federalSubjectsCsv = fs.readFileSync('./seed/federalSubjects.csv', 'utf8');
	const federalSubjects = parse(federalSubjectsCsv, {
		columns: true,
		skip_empty_lines: true,
		cast: true,
	});

	console.log(federalDistricts);
	console.log(federalSubjects);

	await prisma.federalDistrict.deleteMany();
	await prisma.federalDistrict.createMany({ data: federalDistricts });

	await prisma.federalSubject.deleteMany();
	await prisma.federalSubject.createMany({ data: federalSubjects });
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
