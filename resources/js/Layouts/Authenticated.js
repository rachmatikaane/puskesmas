import NavLink from "@/Components/NavLink";
import NavLinkSub from "@/Components/NavLinkSub";
import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

export default function Authenticated({ auth, header, children }) {
  const navs = [
    {
      href: "pengguna",
      src: "pengguna.svg",
      text: "Pengguna",
      render: (
        <NavLinkSub
          title="Pengguna"
          menus={[
            { href: "pengguna", text: "Data Pengguna" },
            { href: "pengguna.buat", text: "Tambah Pengguna" },
          ]}
        />
      ),
    },
    {
      href: "pegawai",
      src: "pegawai.svg",
      text: "Pegawai",
      render: (
        <NavLinkSub
          title="Pengguna"
          menus={[
            { href: "pengguna", text: "Data Pengguna" },
            { href: "pengguna.buat", text: "Tambah Pengguna" },
          ]}
        />
      ),
    },
    {
      href: "antrian",
      src: "antrian.svg",
      text: "Antrian",
      render: (
        <NavLinkSub
          title="Pengguna"
          menus={[
            { href: "pengguna", text: "Data Pengguna" },
            { href: "pengguna.buat", text: "Tambah Pengguna" },
          ]}
        />
      ),
    },
    {
      href: "pasien",
      src: "pasien.svg",
      text: "Pasien",
      render: (
        <NavLinkSub
          title="Pengguna"
          menus={[
            { href: "pengguna", text: "Data Pengguna" },
            { href: "pengguna.buat", text: "Tambah Pengguna" },
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
          title="Pengguna"
          menus={[
            { href: "pengguna", text: "Data Pengguna" },
            { href: "pengguna.buat", text: "Tambah Pengguna" },
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
          title="Pengguna"
          menus={[
            { href: "pengguna", text: "Data Pengguna" },
            { href: "pengguna.buat", text: "Tambah Pengguna" },
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
          title="Pengguna"
          menus={[
            { href: "pengguna", text: "Data Pengguna" },
            { href: "pengguna.buat", text: "Tambah Pengguna" },
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
          title="Pengguna"
          menus={[
            { href: "pengguna", text: "Data Pengguna" },
            { href: "pengguna.buat", text: "Tambah Pengguna" },
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
          title="Pengguna"
          menus={[
            { href: "pengguna", text: "Data Pengguna" },
            { href: "pengguna.buat", text: "Tambah Pengguna" },
          ]}
        />
      ),
    },
  ];

  const submenus = () => {
    const selected = navs.find((n) => window.location.href.includes(n.href));
    return selected && selected.render ? selected.render : <> </>;
  };

  return (
    <div
      className="min-h-screen bg-gray-100 grid"
      style={{ gridTemplateColumns: "1fr 4fr" }}
    >
      <nav
        className="bg-primary text-white border-b border-gray-100 grid"
        style={{ gridTemplateColumns: "64px auto" }}
      >
        <section className="flex flex-col gap-2 justify-start items-start z-10 pt-4">
          {navs.map((n) => (
            <NavLink
              href={n.href}
              src={n.src}
              text={n.text}
              key={n.text}
              extra
            ></NavLink>
          ))}

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

      <main>
        <header className="bg-white shadow hidden lg:block">
          <div className="max-w-7xl mx-auto p-4 flex gap-4">
            <img src="/assets/puskesmas.png" className="w-10" />
            <div>
              <h1 className="text-xl uppercase font-bold font-arya">
                Puskesmas Ciwaruga
              </h1>
              <p className="text-xs">
                Jl. Waruga Raya No 4. Telp (+62) 212-020-3681
              </p>
            </div>
          </div>
        </header>
        <section>{children}</section>
      </main>
    </div>
  );
}
