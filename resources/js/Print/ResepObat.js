import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";

import { formatDate } from "@/Utilities/misc";

const pageStyle = {
  paddingTop: 16,
  paddingHorizontal: 40,
  paddingBottom: 56,
  fontSize: 12,
};

const tableStyle = {
  display: "table",
  width: "auto",
};

const tableRowStyle = {
  flexDirection: "row",
};

const firstTableColHeaderStyle = {
  width: "13%",
  borderStyle: "solid",
  borderColor: "#000",
  borderBottomColor: "#000",
  borderWidth: 1,
  backgroundColor: "#bdbdbd",
};

const tableColHeaderStyle = {
  width: "29%",
  borderStyle: "solid",
  borderColor: "#000",
  borderBottomColor: "#000",
  borderWidth: 1,
  borderLeftWidth: 0,
  backgroundColor: "#bdbdbd",
};

const firstTableColStyle = {
  width: "13%",
  borderStyle: "solid",
  borderColor: "#000",
  borderWidth: 1,
  borderTopWidth: 0,
};

const tableColStyle = {
  width: "29%",
  borderStyle: "solid",
  borderColor: "#000",
  borderWidth: 1,
  borderLeftWidth: 0,
  borderTopWidth: 0,
};

const noBorderTableColStyle = {
  borderWidth: 0,
};

const tableCellHeaderStyle = {
  textAlign: "center",
  margin: 4,
  fontSize: 12,
  fontWeight: "bold",
};

const tableCellStyle = {
  textAlign: "center",
  margin: 5,
  fontSize: 10,
};

const tanggalStyle = {
  textAlign: "right",
  marginBottom: 8,
};

const PrintDocument = ({ kunjungan, kontak, pemeriksaan }) => (
  <Document>
    <Page size="A4" style={pageStyle} orientation="portrait">
      <Text>{kunjungan.pegawai ? kunjungan.pegawai.nama : kunjungan}</Text>
      <Text>{kontak[2].isi}</Text>
      <Text style={tanggalStyle}>Bandung, {formatDate(new Date())}</Text>

      <View style={tableStyle}>
        <View style={tableRowStyle} fixed>
          <View style={firstTableColHeaderStyle}>
            <Text style={tableCellHeaderStyle}>No</Text>
          </View>

          <View style={tableColHeaderStyle}>
            <Text style={tableCellHeaderStyle}>Nama Obat</Text>
          </View>

          <View style={tableColHeaderStyle}>
            <Text style={tableCellHeaderStyle}>Jumlah</Text>
          </View>

          <View style={tableColHeaderStyle}>
            <Text style={tableCellHeaderStyle}>Aturan Pakai</Text>
          </View>
        </View>

        {pemeriksaan &&
          pemeriksaan.resep_obat.map((resep, i) => (
            <View key={resep.id} style={tableRowStyle}>
              <View style={firstTableColStyle}>
                <Text style={tableCellStyle}>{i + 1}</Text>
              </View>

              <View style={tableColStyle}>
                <Text style={tableCellStyle}>
                  {resep.nama ?? resep.obat.nama}
                </Text>
              </View>

              <View style={tableColStyle}>
                <Text style={tableCellStyle}>
                  {resep.qty ?? resep.jumlah}{" "}
                  {resep.satuan ?? resep.obat.satuan}
                </Text>
              </View>

              <View style={tableColStyle}>
                <Text style={tableCellStyle}>{resep.aturan_pakai}</Text>
              </View>
            </View>
          ))}

        <View style={[tableStyle, { marginTop: 8 }]}>
          <View style={tableRowStyle}>
            <View style={[noBorderTableColStyle, { width: "20%" }]}>
              <Text>Nama Pasien</Text>
            </View>
            <View style={[noBorderTableColStyle, { width: "1%" }]}>
              <Text>:</Text>
            </View>
            <View style={[noBorderTableColStyle, { width: "79%" }]}>
              <Text>{kunjungan.pasien.nama}</Text>
            </View>
          </View>

          <View style={tableRowStyle}>
            <View style={[noBorderTableColStyle, { width: "20%" }]}>
              <Text>Alamat</Text>
            </View>
            <View style={[noBorderTableColStyle, { width: "1%" }]}>
              <Text>:</Text>
            </View>
            <View style={[noBorderTableColStyle, { width: "79%" }]}>
              <Text>{kunjungan.pasien.alamat}</Text>
            </View>
          </View>

          <View style={tableRowStyle}>
            <View style={[noBorderTableColStyle, { width: "20%" }]}>
              <Text>Nomor Resep</Text>
            </View>
            <View style={[noBorderTableColStyle, { width: "1%" }]}>
              <Text>:</Text>
            </View>
            <View style={[noBorderTableColStyle, { width: "79%" }]}>
              <Text>{kunjungan.no_resep_obat ?? pemeriksaan.no_resep}</Text>
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default PrintDocument;
