import NavLink from "@/Components/NavLink";
import NavLinkSub from "@/Components/NavLinkSub";
import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

export default function Navbar(props) {
  const navs = [
    {
      href: "pegawai",
      src: "pegawai.svg",
      text: "Pegawai",
      render: (
        <NavLinkSub
          title="Pegawai"
          menus={[
            { href: "pegawai", text: "Data Pegawai" },
            { href: "pegawai.create", text: "Tambah Pegawai" },
          ]}
        />
      ),
    },
    {
      href: "layanan",
      src: "layanan.svg",
      text: "Layanan",
      render: (
        <NavLinkSub
          title="Layanan"
          menus={[
            { href: "layanan", text: "Data Layanan" },
            { href: "layanan.create", text: "Tambah Layanan" },
          ]}
        />
      ),
    },
    {
      href: "antrian",
      src: "antrian.svg",
      text: "Antrian",
      render: <NavLinkSub title="Antrian" menus={[]} />,
    },
    {
      href: "pasien",
      src: "pasien.svg",
      text: "Pasien",
      render: (
        <NavLinkSub
          title="pegawai"
          menus={[
            { href: "pegawai", text: "Data pegawai" },
            { href: "pegawai.create", text: "Tambah pegawai" },
          ]}
        />
      ),
    },
    {
      href: "obat",
      src: "obat.svg",
      text: "Obat",
      render: (
        <NavLinkSub
          title="pegawai"
          menus={[
            { href: "pegawai", text: "Data pegawai" },
            { href: "pegawai.create", text: "Tambah pegawai" },
          ]}
        />
      ),
    },
    {
      href: "kunjungan",
      src: "kunjungan.svg",
      text: "Kunjungan",
      render: (
        <NavLinkSub
          title="pegawai"
          menus={[
            { href: "pegawai", text: "Data pegawai" },
            { href: "pegawai.create", text: "Tambah pegawai" },
          ]}
        />
      ),
    },
    {
      href: "rekam_medis",
      src: "rekam_medis.svg",
      text: "Rekam Medis",
      render: (
        <NavLinkSub
          title="pegawai"
          menus={[
            { href: "pegawai", text: "Data pegawai" },
            { href: "pegawai.create", text: "Tambah pegawai" },
          ]}
        />
      ),
    },
    {
      href: "pengaturan",
      src: "cogwheel.svg",
      text: "Pengaturan",
      render: (
        <NavLinkSub
          title="pegawai"
          menus={[
            { href: "pegawai", text: "Data pegawai" },
            { href: "pegawai.create", text: "Tambah pegawai" },
          ]}
        />
      ),
    },
  ];
  const userAccess = {
    admin: [0, 1, 2, 3, 4, 5, 6, 7],
    antrian: [2, 7],
  };

  const submenus = () => {
    const selected = navs.find((n) => window.location.href.includes(n.href));
    return selected && selected.render ? selected.render : <> </>;
  };

  return (
    <nav className="bg-primary text-white border-b border-gray-100 fixed min-h-screen nav">
      <section className="flex flex-col gap-2 justify-start items-start z-10 pt-4">
        {navs.map(
          (n, i) =>
            userAccess[props.auth.user.peran].includes(i) && (
              <NavLink
                href={n.href}
                src={n.src}
                text={n.text}
                key={n.text}
                extra
              ></NavLink>
            )
        )}

        <InertiaLink
          href={route("logout")}
          method="post"
          as="button"
          className="nav-item flex gap-4 items-center w-full text-xs "
        >
          <img src={`/assets/logout.svg`} className="nav-img" />
          <span>Keluar</span>
        </InertiaLink>
      </section>

      <section className="bg-black pt-4">{submenus()}</section>
    </nav>
  );
}
