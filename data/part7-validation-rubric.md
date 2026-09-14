# Rúbrica de validación — TOEIC Boost Part 7 (banco de clase)

**Uso:** Solo sets/ítems de `part7-bank.json` (práctica guiada y mocks futuros). El intro gratuito (`part7-intro.json`) no se valida con este estricto.  
**Meta:** ~**100** preguntas validadas vía lotes (~20 Q/lote), mezcla de **single** + **double/triple**.  
**Umbral:** promedio ≥ 4.0 en las 5 dimensiones **y** ninguna dimensión < 3.

## Dimensiones (1–5)

| # | Dimensión | 5 = excelente | Rechazar si… |
|---|-----------|---------------|--------------|
| 1 | **Autenticidad de formato** | Set con `setType` correcto (`single` / `double` / `triple`); `passages` length = 1 / 2 / 3; singles con **2–4** Q; multi con **5** Q; cada pregunta tiene exactamente 4 opciones A–D; `correctKey` coincide con `correctAnswer` | Conteo de pasajes/Q incorrecto, clave ambigua, opciones de longitud absurda, stem sin ancla en el texto |
| 2 | **Calidad del pasaje** | Inglés laboral original (email, carta, memo, aviso, anuncio, artículo, formulario/horario, chat, factura/orden); longitud y tono tipo Reading Comprehension; multi: textos relacionados de forma natural | Tono académico/campus, pasajes desconectados en un set multi, slang, copia de wording ETS |
| 3 | **Claridad de la pregunta** | `questionType` (`detail` / `main_idea` / `inference` / `vocabulary` / `not_except` / `cross_reference`) coincide con lo que evalúa; stem claro; vocab-in-context marca la palabra en el pasaje | Etiqueta incorrecta; pregunta que se responde sin leer; “NOT/except” confuso o con doble negación |
| 4 | **Distractores** | Trampas plausibles de TOEIC (detalle cercano, propósito parcial, inferencia exagerada, sinónimo falso, opción verdadera pero que no responde) | Nonsense, o más de una respuesta defendible con el pasaje |
| 5 | **Explicación** | Enseña por qué la clave encaja **en el/los pasaje(s)**; `commonMistake` nombra la trampa típica | Solo traduce la clave, ignora el contexto, o no menciona el error común |

## Nota extra — multi-pasaje / cross-reference (fairness)

Para sets `double` o `triple`:

- Al menos **1–2** preguntas deben exigir **cruzar** información entre pasajes (`questionType: cross_reference`).
- La respuesta correcta debe ser **recuperable** con evidencia en los textos (no “conocimiento del mundo”).
- Evitar trampas donde el distractor es “verdadero en un solo pasaje” **sin** avisar al estudiante; el stem debe dejar claro si pide síntesis (“According to both…”, “What is true of…”, “Which of the following… based on the email and the notice”).
- Los géneros de Passage A / B (/ C) deben complementar (p. ej. email + adjunto/aviso; chat + formulario; artículo + carta al editor), no ser dos textos aleatorios.

## Tipos de pregunta (oficial Part 7)

1. **detail** — dato explícito (quién, cuándo, cuánto, dónde)
2. **main_idea** — propósito / idea principal del texto o sección
3. **inference** — conclusión razonable no dicha palabra por palabra
4. **vocabulary** — significado en contexto de una palabra/frase del pasaje
5. **not_except** — “Which is NOT true / EXCEPT…” (una opción no se sostiene)
6. **cross_reference** — solo multi: combina info de 2+ pasajes

## Política de curación (Israel)

- Demos / intro libre: más livianos OK (salvo bug crítico).
- Guiada + mocks: **solo** sets validados (rubric ≥ 4.0).
- Todo el contenido es **original** (no stems ni pasajes con copyright de ETS).
- Dificultad: mayormente 2–3, algunos 4; evitar banco todo-fácil.
- Mix por lote (~16–20 Q): varios singles (2–4 Q) + al menos un double/triple (5 Q) cuando el lote lo permita.
- Géneros rotados: email, letter, memo, notice, ad, article, form, chat, invoice/order.

## Banderas automáticas de rechazo

- Claves dobles / ambigüedad en contexto
- Vocab-in-context sin la palabra objetivo en el pasaje
- Cross-reference que se responde con un solo pasaje (etiqueta falsa)
- Set multi con pasajes sin vínculo temático
- Sensación de examen de traducción palabra por palabra
