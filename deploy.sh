app_name="geodesy"

# # BUILD THE PACKAGE
sudo -u www-data npm run build --MODE=production

# # COPY THE PACKAGE TO THE REMOTE MACHINE
sudo -u www-data cp -r package.json package-lock.json ./build
sudo -u www-data cp -r prisma/schema.prisma ./build/prisma

cd ./build
npm ci --omit dev
npx prisma generate
cd ../

pm2 stop /build/index.js --name $app_name 2>/dev/null
pm2 delete /build/index.js --name $app_name
HOST=127.0.0.1 PORT=3000 pm2 start /build/index.js --name $app_name
