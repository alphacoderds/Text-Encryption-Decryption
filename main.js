// Fungsi dekripsi
const caesarDecrypt = (text, shift) =>
  text
    .split("")
    .map(char => String.fromCharCode((char.charCodeAt(0) - shift + 256) % 256))
    .join("");

const vigenereDecrypt = (text, key) =>
  text
    .split("")
    .map((char, i) =>
      String.fromCharCode(
        (char.charCodeAt(0) - key.charCodeAt(i % key.length) + 256) % 256
      )
    )
    .join("");

const aesDecrypt = (text, key) => {
  const aesKey = CryptoJS.enc.Utf8.parse(key);
  const iv = CryptoJS.enc.Utf8.parse("1234567890123456");
  const decrypted = CryptoJS.AES.decrypt(text, aesKey, { iv: iv, mode: CryptoJS.mode.CBC });
  return CryptoJS.enc.Utf8.stringify(decrypted);
};

const streamDecrypt = (text, key) => {
  const streamKey = CryptoJS.enc.Utf8.parse(key);
  const decrypted = CryptoJS.RC4.decrypt(text, streamKey);
  return CryptoJS.enc.Utf8.stringify(decrypted);
};

const serpentDecrypt = (text, key) => {
  const combinedKey = key.repeat(16).slice(0, 16); // Simulasi key padding
  const serpentKey = CryptoJS.enc.Utf8.parse(combinedKey);
  const iv = CryptoJS.enc.Utf8.parse("1234567890123456");
  const decrypted = CryptoJS.AES.decrypt(text, serpentKey, { iv: iv, mode: CryptoJS.mode.ECB });
  return CryptoJS.enc.Utf8.stringify(decrypted);
};

// Event listener untuk form
document.getElementById("encryption-form").addEventListener("submit", function (event) {
  event.preventDefault();

  // Ambil input pengguna
  const plaintext = document.getElementById("plaintext").value;
  const key = document.getElementById("key").value;

  if (!plaintext || !key) {
    Swal.fire("Error", "Harap isi semua kolom!", "error");
    return;
  }

  // Lapisan 1: Caesar Cipher
  const caesarCipher = (text, shift) =>
    text
      .split("")
      .map(char => String.fromCharCode((char.charCodeAt(0) + shift) % 256))
      .join("");

  const caesarShift = 3;
  let encrypted = caesarCipher(plaintext, caesarShift);
  let resultsHtml = `<h5>Hasil Enkripsi:</h5><ul>`;

  // Menampilkan hasil lapisan 1
  resultsHtml += `<li>Lapisan 1 (Caesar Cipher): ${encrypted} <button class="btn btn-info btn-sm" onclick="showLayer('caesar', '${encrypted}', true)">Tampilkan</button> <button class="btn btn-warning btn-sm" onclick="showLayer('caesar', '${encrypted}', false)">Dekripsi</button></li><br>`;

  // Lapisan 2: Vigenere Cipher
  const vigenereCipher = (text, key) =>
    text
      .split("")
      .map((char, i) =>
        String.fromCharCode((char.charCodeAt(0) + key.charCodeAt(i % key.length)) % 256)
      )
      .join("");

  encrypted = vigenereCipher(encrypted, key);
  // Menampilkan hasil lapisan 2
  resultsHtml += `<li>Lapisan 2 (Vigenere Cipher): ${encrypted} <button class="btn btn-info btn-sm" onclick="showLayer('vigenere', '${encrypted}', true)">Tampilkan</button> <button class="btn btn-warning btn-sm" onclick="showLayer('vigenere', '${encrypted}', false)">Dekripsi</button></li><br>`;

  // Lapisan 3: Block Cipher CBC (AES)
  const aesEncrypt = (text, key) => {
    const aesKey = CryptoJS.enc.Utf8.parse(key);
    const iv = CryptoJS.enc.Utf8.parse("1234567890123456");
    const encrypted = CryptoJS.AES.encrypt(text, aesKey, { iv: iv, mode: CryptoJS.mode.CBC });
    return encrypted.toString();
  };

  encrypted = aesEncrypt(encrypted, key);
  // Menampilkan hasil lapisan 3
  resultsHtml += `<li>Lapisan 3 (AES): ${encrypted} <button class="btn btn-info btn-sm" onclick="showLayer('aes', '${encrypted}', true)">Tampilkan</button> <button class="btn btn-warning btn-sm" onclick="showLayer('aes', '${encrypted}', false)">Dekripsi</button></li><br>`;

  // Lapisan 4: Stream Cipher (RC4)
  const streamEncrypt = (text, key) => {
    const streamKey = CryptoJS.enc.Utf8.parse(key);
    const encrypted = CryptoJS.RC4.encrypt(text, streamKey);
    return encrypted.toString();
  };

  encrypted = streamEncrypt(encrypted, key);
  // Menampilkan hasil lapisan 4
  resultsHtml += `<li>Lapisan 4 (RC4): ${encrypted} <button class="btn btn-info btn-sm" onclick="showLayer('rc4', '${encrypted}', true)">Tampilkan</button> <button class="btn btn-warning btn-sm" onclick="showLayer('rc4', '${encrypted}', false)">Dekripsi</button></li><br>`;

  // Lapisan 5: Pseudo Serpent
  const serpentEncrypt = (text, key) => {
    const combinedKey = key.repeat(16).slice(0, 16); // Simulasi key padding
    const serpentKey = CryptoJS.enc.Utf8.parse(combinedKey);
    const iv = CryptoJS.enc.Utf8.parse("1234567890123456");
    const encrypted = CryptoJS.AES.encrypt(text, serpentKey, { iv: iv, mode: CryptoJS.mode.ECB }); // Simulasi ECB
    return encrypted.toString();
  };

  encrypted = serpentEncrypt(encrypted, key);
  // Menampilkan hasil lapisan 5
  resultsHtml += `<li>Lapisan 5 (Serpent): ${encrypted} <button class="btn btn-info btn-sm" onclick="showLayer('serpent', '${encrypted}', true)">Tampilkan</button> <button class="btn btn-warning btn-sm" onclick="showLayer('serpent', '${encrypted}', false)">Dekripsi</button></li>`;
  resultsHtml += `</ul>`;

  // Menampilkan semua hasil enkripsi
  document.getElementById('results').innerHTML = resultsHtml;

  // Tampilkan hasil akhir
  Swal.fire({
    title: "Hasil Enkripsi",
    html: `<strong>Encrypted:</strong> ${encrypted}`,
    icon: "success",
    confirmButtonText: "Lanjut Dekripsi",
  }).then(() => {
    // Dekripsi (Serpent ➡️ RC4 ➡️ CBC ➡️ Vigenere ➡️ Caesar)
    let decrypted = serpentDecrypt(encrypted, key);
    decrypted = streamDecrypt(decrypted, key);
    decrypted = aesDecrypt(decrypted, key);
    decrypted = vigenereDecrypt(decrypted, key);
    decrypted = caesarDecrypt(decrypted, caesarShift);

    Swal.fire({
      title: "Hasil Dekripsi",
      html: `<strong>Decrypted:</strong> ${decrypted}`,
      icon: "info",
      confirmButtonText: "Selesai",
    });
  });
});

// Fungsi untuk menampilkan hasil enkripsi atau dekripsi dari masing-masing lapisan
function showLayer(layer, text, isEncrypted) {
  let title = isEncrypted ? `Hasil Enkripsi ${layer.charAt(0).toUpperCase() + layer.slice(1)}` : `Hasil Dekripsi ${layer.charAt(0).toUpperCase() + layer.slice(1)}`;
  let resultText = isEncrypted ? text : decryptLayer(layer, text);

  Swal.fire({
    title: title,
    html: `<strong>${isEncrypted ? 'Encrypted' : 'Decrypted'}:</strong> ${resultText}`,
    icon: "info",
    confirmButtonText: "OK"
  });
}

// Fungsi untuk mendekripsi teks berdasarkan lapisan
function decryptLayer(layer, text) {
  const key = document.getElementById("key").value;

  switch (layer) {
    case 'caesar':
      return caesarDecrypt(text, 3);
    case 'vigenere':
      return vigenereDecrypt(text, key);
    case 'aes':
      return aesDecrypt(text, key);
    case 'rc4':
      return streamDecrypt(text, key);
    case 'serpent':
      return serpentDecrypt(text, key);
    default:
      return text;
  }
}