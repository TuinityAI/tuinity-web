"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type Msg = { from: "customer" | "bot"; text: string; time: string };
type Conversation = { vertical: string; messages: Msg[] };

const CONVERSATIONS: Conversation[] = [
  {
    vertical: "Restaurante",
    messages: [
      { from: "customer", text: "Hola, ¿tienen mesa para 4 mañana por la noche?", time: "00:11" },
      { from: "bot", text: "¡Hola! Sí, mañana tengo 21:00 y 21:30. ¿Cuál te reservo?", time: "00:11" },
      { from: "customer", text: "21:00 estaría bien", time: "00:12" },
      { from: "bot", text: "Perfecto. ¿Prefieres adentro o en la terraza?", time: "00:12" },
      { from: "customer", text: "En la terraza, por favor", time: "00:12" },
      { from: "bot", text: "Listo ✓ Mesa para 4 en la terraza, mañana 21:00.", time: "00:13" },
      { from: "customer", text: "Genial. ¿Tienen opciones sin gluten?", time: "00:13" },
      { from: "bot", text: "Sí, varios platos sin gluten. Lo dejo anotado en la reserva.", time: "00:13" },
      { from: "customer", text: "Excelente, ¡gracias!", time: "00:14" },
      { from: "bot", text: "¡A ti! Cualquier cosa me escribes por aquí.", time: "00:14" },
    ],
  },
  {
    vertical: "Peluquería",
    messages: [
      { from: "customer", text: "Hola, ¿tienen cita para corte esta semana?", time: "01:46" },
      { from: "bot", text: "¡Hola! Sí, jueves 15:00 o viernes 11:00. ¿Cuál prefieres?", time: "01:46" },
      { from: "customer", text: "Viernes 11 está bien", time: "01:47" },
      { from: "bot", text: "Perfecto. ¿Es solo corte o también color?", time: "01:47" },
      { from: "customer", text: "Corte y color", time: "01:47" },
      { from: "bot", text: "Genial, para el color reservo un poco más de tiempo. ¿11:00 sigue bien?", time: "01:48" },
      { from: "customer", text: "Sí, de acuerdo", time: "01:48" },
      { from: "bot", text: "Agendado ✓ Viernes 11:00, corte y color.", time: "01:48" },
      { from: "customer", text: "¿Cuánto cuesta aproximadamente?", time: "01:49" },
      { from: "bot", text: "Corte B/.15 y color desde B/.35. Te confirmo en el salón.", time: "01:49" },
      { from: "customer", text: "Perfecto, ¡gracias!", time: "01:49" },
      { from: "bot", text: "¡Gracias a ti! Te espero el viernes.", time: "01:49" },
    ],
  },
  {
    vertical: "Tienda",
    messages: [
      { from: "customer", text: "Hola, ¿les quedan zapatillas talla 42?", time: "02:31" },
      { from: "bot", text: "¡Hola! Sí, en negro y blanco. ¿Cuál buscas?", time: "02:31" },
      { from: "customer", text: "Negras", time: "02:32" },
      { from: "bot", text: "Nos quedan 2 pares. ¿Te reservo uno?", time: "02:32" },
      { from: "customer", text: "Sí, por favor", time: "02:32" },
      { from: "bot", text: "Listo ✓ Reservado. ¿Pasas a retirarlo o te lo envío?", time: "02:33" },
      { from: "customer", text: "Envío", time: "02:33" },
      { from: "bot", text: "Perfecto. El envío a tu zona cuesta B/.4 y llega en 48 h.", time: "02:33" },
      { from: "customer", text: "De acuerdo, continúa", time: "02:34" },
      { from: "bot", text: "Hecho ✓ Te paso el enlace de pago por aquí.", time: "02:34" },
    ],
  },
  {
    vertical: "Inmobiliaria",
    messages: [
      { from: "customer", text: "Hola, ¿puedo visitar el departamento del centro?", time: "03:04" },
      { from: "bot", text: "¡Hola! Sí, mañana tengo 12:00 y 17:00. ¿Cuál te queda?", time: "03:04" },
      { from: "customer", text: "17:00 mejor", time: "03:05" },
      { from: "bot", text: "Perfecto. ¿Cuántas personas van a la visita?", time: "03:05" },
      { from: "customer", text: "Dos", time: "03:05" },
      { from: "bot", text: "Anotado ✓ Visita mañana 17:00. Te paso la dirección.", time: "03:06" },
      { from: "customer", text: "¿El departamento acepta mascotas?", time: "03:06" },
      { from: "bot", text: "Sí, acepta mascotas. Cualquier duda te la respondo por aquí.", time: "03:06" },
      { from: "customer", text: "Genial, ¡gracias!", time: "03:07" },
      { from: "bot", text: "¡A ti! Nos vemos mañana.", time: "03:07" },
    ],
  },
  {
    vertical: "Gimnasio",
    messages: [
      { from: "customer", text: "Hola, ¿cuánto cuesta la membresía mensual?", time: "23:56" },
      { from: "bot", text: "¡Hola! El plan completo cuesta B/.45 e incluye clases. ¿Te lo activo?", time: "23:56" },
      { from: "customer", text: "¿Qué clases tienen?", time: "23:57" },
      { from: "bot", text: "Funcional, spinning y yoga, todos los días. ¿Te reservo una?", time: "23:57" },
      { from: "customer", text: "Spinning mañana", time: "23:57" },
      { from: "bot", text: "Listo ✓ Te anoté en spinning mañana 19:00.", time: "23:58" },
      { from: "customer", text: "¿Y la membresía?", time: "23:58" },
      { from: "bot", text: "Te la dejo lista para activar. ¿Comenzamos este mes?", time: "23:58" },
      { from: "customer", text: "Sí, actívamela", time: "23:59" },
      { from: "bot", text: "Hecho ✓ Membresía activa. ¡Bienvenido!", time: "23:59" },
    ],
  },
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function Dots() {
  return (
    <span className="flex items-center gap-1.5 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="bg-neutral-400 rounded-full size-1.5"
          animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
        />
      ))}
    </span>
  );
}

function Bubble({ msg, typing }: { msg?: Msg; typing?: boolean }) {
  const bot = typing ? true : msg!.from === "bot";
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
      transition={{
        default: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
        layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      }}
      className={`flex max-w-[78%] flex-col gap-1 ${
        bot ? "items-end self-end" : "items-start self-start"
      }`}
    >
      <div
        className={`rounded-lg px-4 py-2.5 text-sm md:text-[15px] leading-snug ${
          bot
            ? "bg-white text-neutral-950"
            : "border border-white/10 bg-neutral-800 text-neutral-100"
        }`}
      >
        {typing ? <Dots /> : msg!.text}
      </div>
      {!typing && (
        <span className="px-0.5 font-mono text-[10px] text-neutral-500">
          {msg!.time}
        </span>
      )}
    </motion.div>
  );
}

export function ChatDemo() {
  const [conv, setConv] = useState(0);
  const [count, setCount] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      let idx = 0;
      while (!cancelled) {
        setConv(idx);
        setCount(0);
        setTyping(false);
        await sleep(700);
        const msgs = CONVERSATIONS[idx].messages;
        for (let i = 0; i < msgs.length && !cancelled; i++) {
          if (msgs[i].from === "bot") {
            setTyping(true);
            await sleep(1000);
            if (cancelled) break;
            setTyping(false);
          }
          setCount(i + 1);
          await sleep(msgs[i].from === "bot" ? 1450 : 950);
        }
        await sleep(2600);
        idx = (idx + 1) % CONVERSATIONS.length;
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const current = CONVERSATIONS[conv];
  const messages = current.messages.slice(0, count);

  return (
    <div className="bg-[#161616] w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 md:px-6 py-3.5 border-white/10 border-b">
        <span className="bg-neutral-500 rounded-full size-1.5" />
        <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.22em]">
          {current.vertical}
        </span>
      </div>

      {/* Mensajes */}
      <div className="flex flex-col justify-end gap-3.5 bg-[#1f1f1f] px-4 md:px-8 py-6 h-[360px] md:h-[440px] overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          {messages.map((m, i) => (
            <Bubble key={`${conv}-${i}`} msg={m} />
          ))}
          {typing && <Bubble key={`${conv}-${count}`} typing />}
        </AnimatePresence>
      </div>
    </div>
  );
}
