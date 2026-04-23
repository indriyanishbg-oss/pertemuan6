> Why do I have a folder named ".expo" in my project?

The ".expo" folder is created when an Expo project is started using "expo start" command.

> What do the files contain?

- "devices.json": contains information about devices that have recently opened this project. This is used to populate the "Development sessions" list in your development builds.
- "settings.json": contains the server configuration that is used to serve the application manifest.

> Should I commit the ".expo" folder?

No, you should not share the ".expo" folder. It does not contain any information that is relevant for other developers working on the project, i# ShopList App - Pemrograman Mobile Pertemuan 6

## Nama & NIM
- Nama: [indri shng]
- NIM:  [243303126294]

## Fitur yang Diimplementasikan
- [x] FlatList dengan 12+ produk
- [x] Custom ProductCard component (file terpisah)
- [x] keyExtractor dengan ID unik
- [x] ListEmptyComponent (empty state)
- [x] Search / Filter real-time
- [x] Pull-to-Refresh
- [ ] Filter Kategori (E1) — isi jika dikerjakan
- [ ] Toggle List/Grid View (E2) — isi jika dikerjakan
- [ ] SectionList Mode (E3) — isi jika dikerjakan
- [ ] Sort Produk (E4) — isi jika dikerjakan

## Screenshot
### Tampilan Utama (List Produk)
![screenshot HP fisik di sini](./image/ss3.jpeg))

### Tampilan Search — saat ada hasil
![screenshot HP fisik di sini](./image/ss1.jpeg)

### Tampilan Empty State — saat tidak ada hasil
![screenshot HP fisik di sini](./image/ss2.jpeg)

## Cara Menjalankan
1. Clone repo  : git clone [url-repo-kamu]
2. Install deps: npm install
3. Jalankan    : npx expo start
4. Scan QR Code dengan Expo Go di HPt is specific to your machine.
Upon project creation, the ".expo" folder is already added to your ".gitignore" file.