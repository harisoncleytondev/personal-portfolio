"use client";
import { useContact } from "@/hooks/useContact";
import { Settings } from "@prisma/client";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaWhatsapp,
} from "react-icons/fa";
import { IoLogoGithub, IoLogoLinkedin, IoLogoInstagram } from "react-icons/io";
import { toast } from "sonner";

type FooterProps = Pick<
  Settings,
  "email" | "phone" | "instagram" | "github" | "linkedin"
>;

export const FooterComponent = ({
  email,
  phone,
  instagram,
  github,
  linkedin,
}: FooterProps) => {
  const { mutate: contact } = useContact();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Enviando email...");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    contact(
      { name, email, message },
      {
        onSuccess: () => {
          toast.success("Email enviado com sucesso!", { id: toastId });
          e.currentTarget.reset();
        },
        onError: () =>
          toast.error("Ops! Não foi possivel enviar o email.", { id: toastId }),
      }
    );
  };

  const whatsappLink = phone
    ? `https://wa.me/55${phone.replace(/\D/g, "")}`
    : "#";

  return (
    <footer
      id="page-contact"
      className="bg-secondary pt-20 pb-10 px-8 border-t border-white/10 text-white transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
        <div className="lg:col-span-3 flex flex-col gap-10">
          <div>
            <h2 className="font-primary text-4xl font-bold mb-6 text-white">
              Vamos conversar?
            </h2>
            <p className="font-secondary text-white/90 text-lg leading-relaxed max-w-2xl">
              Estou sempre aberto a novas oportunidades, parcerias ou apenas
              para trocar uma ideia sobre tecnologia. Se tens um projeto em
              mente ou queres apenas dizer olá, a minha caixa de entrada está
              sempre aberta!
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-5 group cursor-pointer">
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white group-hover:bg-white group-hover:text-secondary transition-all duration-300 shadow-lg">
                <FaMapMarkerAlt className="text-2xl" />
              </div>
              <div>
                <span className="block font-primary font-bold text-lg opacity-80">
                  Localização
                </span>
                <span className="text-xl font-bold">Pernambuco, Brasil</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border-2 border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300 hover:-translate-y-1 shadow-md"
              title="WhatsApp"
            >
              <FaWhatsapp className="text-2xl" />
            </a>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border-2 border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-secondary hover:border-white transition-all duration-300 hover:-translate-y-1 shadow-md"
            >
              <IoLogoGithub className="text-2xl" />
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border-2 border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-secondary hover:border-white transition-all duration-300 hover:-translate-y-1 shadow-md"
            >
              <IoLogoLinkedin className="text-2xl" />
            </a>
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border-2 border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-secondary hover:border-white transition-all duration-300 hover:-translate-y-1 shadow-md"
            >
              <IoLogoInstagram className="text-2xl" />
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 bg-[var(--color-card)] p-8 rounded-3xl shadow-2xl flex flex-col gap-5 transition-colors duration-300"
        >
          <h3 className="font-primary text-2xl font-bold text-secondary mb-2">
            Envie uma mensagem
          </h3>

          <div className="flex flex-col gap-1">
            <label className="font-primary font-bold text-xs uppercase tracking-wider text-gray ml-1">
              Nome
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="Digite seu nome"
              className="w-full bg-light-gray p-3 rounded-xl border border-transparent focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all placeholder:text-gray/50 font-secondary text-dark-gray"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-primary font-bold text-xs uppercase tracking-wider text-gray ml-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="seu@email.com"
              className="w-full bg-light-gray p-3 rounded-xl border border-transparent focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all placeholder:text-gray/50 font-secondary text-dark-gray"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-primary font-bold text-xs uppercase tracking-wider text-gray ml-1">
              Mensagem
            </label>
            <textarea
              name="message"
              required
              rows={3}
              placeholder="Como posso ajudar?"
              className="w-full bg-light-gray p-3 rounded-xl border border-transparent focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all placeholder:text-gray/50 resize-none font-secondary text-dark-gray"
            ></textarea>
          </div>

          <button className="mt-2 bg-secondary text-white font-primary font-bold py-3 rounded-xl shadow-lg hover:bg-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 uppercase text-sm tracking-widest">
            <FaPaperPlane /> Enviar
          </button>
        </form>
      </div>

      <div className="mt-20 pt-8 border-t border-white/20 text-center opacity-60 hover:opacity-100 transition-opacity">
        <p className="font-secondary text-sm">
          © {new Date().getFullYear()} - Até logo, leitor curioso.
        </p>
      </div>
    </footer>
  );
};
