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

const PrintDocument = ({ data, kunjungan, petugas }) => (
  <Document>
    <Page size="A4" style={pageStyle} orientation="portrait">
      <Text style={{ textAlign: "center", marginBottom: 8 }}>
        Laporan Kunjungan {data.judul_laporan} {data.text_laporan}{" "}
        {data.jenis_laporan !== "per_tanggal" &&
          `per ${formatDate(new Date())}`}
      </Text>

      <View style={tableStyle}>
        <View style={tableRowStyle} fixed>
          <View style={firstTableColHeaderStyle}>
            <Text style={tableCellHeaderStyle}>No</Text>
          </View>

          <View style={tableColHeaderStyle}>
            <Text style={tableCellHeaderStyle}>Tanggal</Text>
          </View>

          <View style={tableColHeaderStyle}>
            <Text style={tableCellHeaderStyle}>Nama Pasien</Text>
          </View>

          <View style={tableColHeaderStyle}>
            <Text style={tableCellHeaderStyle}>Pelayanan</Text>
          </View>
        </View>

        {kunjungan &&
          kunjungan.map((k, i) => (
            <View key={k.id} style={tableRowStyle}>
              <View style={firstTableColStyle}>
                <Text style={tableCellStyle}>{i + 1}</Text>
              </View>

              <View style={tableColStyle}>
                <Text style={tableCellStyle}>{formatDate(k.tanggal)}</Text>
              </View>

              <View style={tableColStyle}>
                <Text style={tableCellStyle}>{k.pasien.nama}</Text>
              </View>

              <View style={tableColStyle}>
                <Text style={tableCellStyle}>{k.pegawai.pelayanan.nama}</Text>
              </View>
            </View>
          ))}

        <Text style={{ marginTop: 8, marginBottom: 8 }}>
          Jumlah Kunjungan : {kunjungan.length}
        </Text>
        <Text style={{ marginBottom: 40 }}>Petugas,</Text>
        <Text>{petugas.nama}</Text>
      </View>
    </Page>
  </Document>
);

export default PrintDocument;
