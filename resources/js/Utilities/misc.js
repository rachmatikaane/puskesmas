export const getPeran = (id) => {
  switch (id) {
    case "admin":
      return "Administrator";
    case "pendaftaran":
      return "Pendaftaran";
    case "medis":
      return "Medis";
    case "pembayaran":
      return "Pembayaran";
    case "antrian":
      return "Antrian";
    case "apoteker":
      return "Apoteker";
    default:
      return "";
  }
};

export const getJK = (char) => {
  switch (char) {
    case "L":
      return "Laki - laki";
    case "P":
      return "Perempuan";
    default:
      return "-"
  }
}

export const getStatusKunjungan = (i) => {
  switch (i) {
    case 0:
      return "Belum Selesai";
    case 1:
      return "Selesai Diperiksa";
    default:
      return "-"
  }
}

export const getMonthName = (monthInt) => {
  switch (monthInt + 1) {
    case 1:
      return "Januari";
    case 2:
      return "Februari";
    case 3:
      return "Maret";
    case 4:
      return "April";
    case 5:
      return "Mei";
    case 6:
      return "Juni";
    case 7:
      return "Juli";
    case 8:
      return "Agustus";
    case 9:
      return "September";
    case 10:
      return "Oktober";
    case 11:
      return "November";
    case 12:
      return "Desember";
    default:
      return null;
  }
};

export const formatDate = (date) => {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = getMonthName(newDate.getMonth());
  const year = newDate.getFullYear();

  return `${day} ${month} ${year}`;
};
