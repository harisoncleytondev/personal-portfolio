"use client";
import { useContact } from "@/hooks/useContact";
import { Settings } from "@prisma/client";
import { FaEnvelope, FaPaperPlane, FaWhatsapp } from "react-icons/fa";
import { IoLogoGithub, IoLogoLinkedin, IoLogoInstagram } from "react-icons/io";
import { toast } from "sonner";

type FooterProps = Pick<Settings, "email" | "phone" | "instagram" | "github" | "linkedin">;

export const FooterComponent = ({ email, phone, instagram, github, linkedin }: FooterProps) => {
  const { mutate: contact } = useContact();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Enviando email...");
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    contact({ name, email, message }, {
      onSuccess: () => {
        toast.success("Email enviado com sucesso!", { id: toastId });
        e.currentTarget.reset();
      },
      onError: () => toast.error("Ops! Não foi possivel enviar o email.", { id: toastId }),
    });
  };

  const whatsappLink = phone ? `https://wa.me/55${phone.replace(/\D/g, "")}` : "#";

  return (
    <footer id="page-contact" className="bg-[#08080e] pt-24 pb-10 px-8 border-t border-[#1a1a28]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-mono text-[10px] text-[#555570] tracking-[0.3em] uppercase">~/portfolio/contact</span>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-[#e8e8ed] mt-3">
            <span className="text-[#7c3aed]">$</span> Contato
            <span className="text-[#555570]"> —send</span>
          </h2>
          <p className="font-mono text-xs text-[#555570] mt-3 max-w-lg mx-auto">
            # estou aberto a novas oportunidades e parcerias
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#0f0f1a] border border-[#2a2a40] flex items-center justify-center">
                <FaEnvelope className="text-[#7c3aed] text-lg" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-[#555570] uppercase tracking-[0.2em]">email</span>
                <p className="font-mono text-sm text-[#e8e8ed] mt-0.5">{email}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] text-[#555570] uppercase tracking-[0.2em]">redes</span>
              <div className="flex gap-3">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 border border-[#2a2a40] flex items-center justify-center text-[#555570] hover:text-[#22c55e] hover:border-[#22c55e]/50 transition-all">
                  <FaWhatsapp className="text-lg" />
                </a>
                <a href={github} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 border border-[#2a2a40] flex items-center justify-center text-[#555570] hover:text-[#e8e8ed] hover:border-[#e8e8ed]/30 transition-all">
                  <IoLogoGithub className="text-lg" />
                </a>
                <a href={linkedin} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 border border-[#2a2a40] flex items-center justify-center text-[#555570] hover:text-[#e8e8ed] hover:border-[#e8e8ed]/30 transition-all">
                  <IoLogoLinkedin className="text-lg" />
                </a>
                <a href={instagram} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 border border-[#2a2a40] flex items-center justify-center text-[#555570] hover:text-[#e8e8ed] hover:border-[#e8e8ed]/30 transition-all">
                  <IoLogoInstagram className="text-lg" />
                </a>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-3 bg-[#0f0f1a] border border-[#1e1e30] p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 bg-[#22c55e]" />
              <span className="font-mono text-[10px] text-[#555570]">SEND_MAIL.sh</span>
            </div>

            <div>
              <label className="font-mono text-[9px] text-[#555570] uppercase tracking-[0.15em]">--name</label>
              <input name="name" type="text" required placeholder="Digite seu nome"
                className="w-full mt-1 bg-[#08080e] border border-[#2a2a40] px-3 py-2.5 font-mono text-xs text-[#e8e8ed] outline-none focus:border-[#7c3aed]/50 transition-colors placeholder:text-[#555570]" />
            </div>

            <div>
              <label className="font-mono text-[9px] text-[#555570] uppercase tracking-[0.15em]">--email</label>
              <input name="email" type="email" required placeholder="seu@email.com"
                className="w-full mt-1 bg-[#08080e] border border-[#2a2a40] px-3 py-2.5 font-mono text-xs text-[#e8e8ed] outline-none focus:border-[#7c3aed]/50 transition-colors placeholder:text-[#555570]" />
            </div>

            <div>
              <label className="font-mono text-[9px] text-[#555570] uppercase tracking-[0.15em]">--message</label>
              <textarea name="message" required rows={3} placeholder="Como posso ajudar?"
                className="w-full mt-1 bg-[#08080e] border border-[#2a2a40] px-3 py-2.5 font-mono text-xs text-[#e8e8ed] outline-none focus:border-[#7c3aed]/50 transition-colors placeholder:text-[#555570] resize-none" />
            </div>

            <button className="font-mono text-[10px] px-4 py-3 bg-[#7c3aed] text-[#e8e8ed] hover:bg-[#6d28d9] active:scale-[0.98] transition-all tracking-[0.1em] uppercase flex items-center justify-center gap-2 mt-1">
              <FaPaperPlane className="text-[10px]" />
              $ ./send_email.sh
            </button>
          </form>
        </div>

        <div className="mt-16 pt-6 border-t border-[#1a1a28] text-center">
          <p className="font-mono text-[10px] text-[#555570]">
            <span className="text-[#7c3aed]">©</span> {new Date().getFullYear()} — Até mais leitor curioso
            <span className="animate-cursor-blink text-[#e8e8ed]"> ▌</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
