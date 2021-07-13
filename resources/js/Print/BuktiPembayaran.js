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

const PrintDocument = ({ kunjungan, petugas, totalHarga }) => (
  <Document>
    <Page size="A4" style={pageStyle} orientation="portrait">
      <Text style={{ textAlign: "center", fontSize: 18 }}>
        Bukti Pembayaran
      </Text>
      <View style={[tableStyle, { marginTop: 8 }]}>
        <View style={tableRowStyle}>
          <View style={[noBorderTableColStyle, { width: "20%" }]}>
            <Text>Tanggal Periksa</Text>
          </View>
          <View style={[noBorderTableColStyle, { width: "1%" }]}>
            <Text>:</Text>
          </View>
          <View style={[noBorderTableColStyle, { width: "79%" }]}>
            <Text>{formatDate(kunjungan.rekam_medis.tanggal)}</Text>
          </View>
        </View>

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
            <Text>Pelayanan</Text>
          </View>
          <View style={[noBorderTableColStyle, { width: "1%" }]}>
            <Text>:</Text>
          </View>
          <View style={[noBorderTableColStyle, { width: "79%" }]}>
            <Text>{kunjungan.pegawai.pelayanan.nama}</Text>
          </View>
        </View>

        <View style={tableRowStyle}>
          <View style={[noBorderTableColStyle, { width: "20%" }]}>
            <Text>Dokter</Text>
          </View>
          <View style={[noBorderTableColStyle, { width: "1%" }]}>
            <Text>:</Text>
          </View>
          <View style={[noBorderTableColStyle, { width: "79%" }]}>
            <Text>{kunjungan.pegawai.nama}</Text>
          </View>
        </View>

        <View style={tableRowStyle}>
          <View style={[noBorderTableColStyle, { width: "20%" }]}>
            <Text>Jenis Pembayaran</Text>
          </View>
          <View style={[noBorderTableColStyle, { width: "1%" }]}>
            <Text>:</Text>
          </View>
          <View style={[noBorderTableColStyle, { width: "79%" }]}>
            <Text>{kunjungan.jenis_pembayaran}</Text>
          </View>
        </View>

        <View style={tableRowStyle}>
          <View style={[noBorderTableColStyle, { width: "20%" }]}>
            <Text>Total Pembayaran</Text>
          </View>
          <View style={[noBorderTableColStyle, { width: "1%" }]}>
            <Text>:</Text>
          </View>
          <View style={[noBorderTableColStyle, { width: "79%" }]}>
            <Text>Rp. {kunjungan.total_harga ?? totalHarga}</Text>
          </View>
        </View>

        <Text style={{ marginTop: 8, marginBottom: 40 }}>Petugas,</Text>
        <Text>{petugas.nama}</Text>
      </View>
    </Page>
  </Document>
);

export default PrintDocument;
