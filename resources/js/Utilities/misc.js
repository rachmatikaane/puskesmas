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
      return "-";
  }
};

export const getStatusKunjungan = (i) => {
  switch (i) {
    case 0:
      return "Belum Selesai";
    case 1:
      return "Selesai Diperiksa";
    default:
      return "-";
  }
};

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

export const getMonthInt = (monthName) => {
  switch (monthName) {
    case "Januari":
      return 1;
    case "Februari":
      return 2;
    case "Maret":
      return 3;
    case "April":
      return 4;
    case "Mei":
      return 5;
    case "Juni":
      return 6;
    case "Juli":
      return 7;
    case "Agustus":
      return 8;
    case "September":
      return 9;
    case "Oktober":
      return 10;
    case "November":
      return 11;
    case "Desember":
      return 12;
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

export const deformatDate = (str) => {
  const explodedStr = str.split(" ");
  if (explodedStr.length !== 3) return str;

  const date = new Date(
    `${explodedStr[2]}-${getMonthInt(explodedStr[1])}-${explodedStr[0]}`
  );
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
};
