import React from "react";
import { Box, Typography, Link, Container } from "@mui/material";

function Footer() {
  return (
    <Box sx={{ backgroundColor: "#fff", color: "#000", pt: 6 }}>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
          gap: 7,
          mb: 3,
        }}
      >
        {/* Kolom 1 */}
        <Box sx={{ flex: 1 }}>
          <img
            src="./src/assets/logo-kahfi.png"
            alt="Logo"
            style={{ marginRight: "8px", height: "75px" }}
          />
          <Typography variant="body2" sx={{ fontWeight: 500, mt: 2 }}>
            Les Privat Terbaik, Terlengkap, Paling Komprehensif.
          </Typography>
        </Box>

        {/* Kolom 2 */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Program Pilihan
          </Typography>
          <ul style={{ paddingLeft: 0, margin: 0, listStyle: "none" }}>
            {[
              "Les privat membaca dan menulis (CALISTUNG)",
              "Les privat mengaji Al-Qur'an dengan metode interaktif",
              "Kelas online dengan pendekatan yang menyenangkan",
            ].map((item, index) => (
              <li key={index} style={{ marginBottom: "12px" }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {item}
                </Typography>
              </li>
            ))}
          </ul>
        </Box>

        {/* Kolom 3 */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Kantor Pusat
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Kav. Madrasah Pembangunan UIN No.55 Pondok Petir, Bojongsari, Depok
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Kontak Konsultan
          </Typography>
          <Typography variant="body2">
            Telp:{" "}
            <Link href="tel:+1234567890" sx={{ color: "#000" }}>
              +123 456 7890
            </Link>
          </Typography>
          <Typography variant="body2">
            Telp:{" "}
            <Link href="tel:+1234567890" sx={{ color: "#000" }}>
              +123 456 7890
            </Link>
          </Typography>
        </Box>
      </Container>

      {/* Garis horizontal dan copyright */}
      <Container maxWidth="lg" sx={{ mb: 2 }}>
        <hr style={{ borderColor: "#ccc", opacity: 0.3 }} />
        <Typography
          variant="body2"
          align="center"
          sx={{ color: "#666", fontSize: 14, mt: 2 }}
        >
          © {new Date().getFullYear()} Kahfi Education. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
