"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { whatsappUrl } from "@/lib/format";
import { WhatsAppIcon } from "./icons";

const ROOMS = ["Cozinha", "Closet", "Dormitório", "Banheiro ou lavabo", "Área gourmet", "Sala", "Lavanderia", "Home office", "Casa inteira"];
const SERVICES = ["Magare Essencial (consultoria e projeto)", "Magare Planejado (projeto e móveis)", "Magare Completo (arquitetura, móveis e execução)", "Ainda não sei"];
const PLACES = ["Casa", "Apartamento", "Espaço comercial"];

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/**
 * Cadastro de lead: monta uma mensagem organizada e abre o WhatsApp da Magare.
 * Os dados não ficam guardados no site (ver Política de Privacidade).
 */
export function LeadForm({ whatsapp, regions }: { whatsapp: string; regions: string[] }) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("nome") ?? "").trim();
    const digits = phone.replace(/\D/g, "");
    if (!name) return setError("Informe seu nome.");
    if (digits.length < 10) return setError("Informe um WhatsApp com DDD, por exemplo (61) 99999-9999.");
    if (!f.get("consentimento")) return setError("Para enviar, confirme que leu a Política de Privacidade.");
    setError(null);
    const rooms = f.getAll("ambientes").map(String);
    const lines = [
      "Olá! Quero solicitar um projeto com a Magare.",
      "",
      `*Nome:* ${name}`,
      `*WhatsApp:* ${phone}`,
      f.get("regiao") ? `*Região:* ${f.get("regiao")}` : "",
      f.get("imovel") ? `*Imóvel:* ${f.get("imovel")}` : "",
      rooms.length ? `*Ambientes:* ${rooms.join(", ")}` : "",
      f.get("servico") ? `*Serviço:* ${f.get("servico")}` : "",
      String(f.get("mensagem") ?? "").trim() ? `*Sobre o projeto:* ${String(f.get("mensagem")).trim()}` : "",
    ].filter((l, i) => l !== "" || i === 1);
    const url = whatsappUrl(whatsapp, lines.join("\n"));
    if (!url) return;
    window.open(url, "_blank", "noopener");
    setSentUrl(url);
  }

  if (sentUrl) {
    return (
      <div role="status" className="py-10">
        <p className="font-display text-[2rem] leading-tight text-ink">Pronto, sua mensagem está no WhatsApp.</p>
        <p className="mt-4 max-w-md leading-relaxed text-muted">
          Confira os dados e toque em enviar na conversa com a Magare. Se o WhatsApp não abriu,{" "}
          <a href={sentUrl} target="_blank" rel="noopener" className="link font-bold">
            abra a conversa por aqui
          </a>
          .
        </p>
        <button type="button" onClick={() => setSentUrl(null)} className="link mt-6 cursor-pointer text-[0.95rem]">
          Preencher de novo
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
      <label className="block">
        <span className="text-sm font-bold text-ink">Nome *</span>
        <input name="nome" required autoComplete="name" className="field" placeholder="Seu nome" />
      </label>
      <label className="block">
        <span className="text-sm font-bold text-ink">WhatsApp *</span>
        <input
          name="whatsapp"
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={phone}
          onChange={(e) => setPhone(maskPhone(e.target.value))}
          className="field"
          placeholder="(61) 99999-9999"
        />
      </label>
      <label className="block">
        <span className="text-sm font-bold text-ink">Região</span>
        <select name="regiao" className="field" defaultValue="">
          <option value="" disabled>
            Onde fica o imóvel
          </option>
          {regions.map((r) => (
            <option key={r}>{r}</option>
          ))}
          <option>Outra região do DF ou entorno</option>
        </select>
      </label>
      <label className="block">
        <span className="text-sm font-bold text-ink">Tipo de imóvel</span>
        <select name="imovel" className="field" defaultValue="">
          <option value="" disabled>
            Casa, apartamento ou comercial
          </option>
          {PLACES.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </label>

      <fieldset className="sm:col-span-2">
        <legend className="text-sm font-bold text-ink">Ambientes</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {ROOMS.map((r) => (
            <label key={r} className="cursor-pointer">
              <input type="checkbox" name="ambientes" value={r} className="chip-input sr-only" />
              <span className="inline-flex min-h-10 items-center rounded-full border border-line px-4 text-[0.95rem] text-ink transition-colors duration-200 hover:border-ink">
                {r}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block sm:col-span-2">
        <span className="text-sm font-bold text-ink">Serviço de interesse</span>
        <select name="servico" className="field" defaultValue="">
          <option value="" disabled>
            Escolha uma opção
          </option>
          {SERVICES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>

      <label className="block sm:col-span-2">
        <span className="text-sm font-bold text-ink">Conte um pouco do seu projeto</span>
        <textarea name="mensagem" rows={3} className="field resize-none" placeholder="O que você quer transformar, prazos, o que não funciona hoje..." />
      </label>

      <label className="flex gap-3 text-[0.95rem] leading-relaxed text-muted sm:col-span-2">
        <input type="checkbox" name="consentimento" className="mt-1 size-5 shrink-0 cursor-pointer accent-[var(--brand)]" />
        <span>
          Li a{" "}
          <Link href="/politica-de-privacidade" className="link">
            Política de Privacidade
          </Link>{" "}
          e concordo em enviar esses dados à Magare pelo WhatsApp para receber o atendimento.
        </span>
      </label>

      {error ? (
        <p role="alert" className="text-[0.95rem] font-bold text-[#9A3B2E] sm:col-span-2">
          {error}
        </p>
      ) : null}

      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-primary w-full cursor-pointer sm:w-auto">
          <WhatsAppIcon />
          Enviar pelo WhatsApp
        </button>
      </div>
    </form>
  );
}
