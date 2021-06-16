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
    default:
      return "";
  }
};
