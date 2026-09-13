# Rúbrica de validación — TOEIC Boost Part 6 (banco de clase)

**Uso:** Solo pasajes/ítems de `part6-bank.json` (práctica guiada y mocks). El intro gratuito (`part6-intro.json`) no se valida con este estricto.  
**Meta:** ~80 preguntas validadas = **20 pasajes × 4 blanks** (`TQB-P6-0001` …).  
**Umbral:** promedio ≥ 4.0 en las 5 dimensiones **y** ninguna dimensión < 3.

## Dimensiones (1–5)

| # | Dimensión | 5 = excelente | Rechazar si… |
|---|-----------|---------------|--------------|
| 1 | **Formato** | Pasaje con **4 blanks** numerados; cada pregunta tiene exactamente 4 opciones A–D; `correctKey` coincide con `correctAnswer`; marcadores de blank claros (`[[131]]` o `_____131_____`) alineados con `blankLabel` | Menos/más de 4 blanks, clave ambigua, opciones de longitud absurda para el tipo, marcador que no aparece en el texto |
| 2 | **Autenticidad Part 6** | Pasaje coherente de inglés laboral (email, carta, memo, aviso, anuncio, artículo); párrafos conectados; longitud/complejidad tipo Text Completion | Tono académico/campus, pasaje desarticulado (cada oración aislada), slang, copia de wording ETS |
| 3 | **Claridad de blankType** | `blankType` (`word_form` / `vocabulary` / `connector` / `sentence_insertion`) coincide con lo que el blank realmente evalúa; sentence insertion tiene opciones de **oración completa** y stem opcional claro | Etiqueta incorrecta (p. ej. connector cuando es word form); “sentence insertion” con solo palabras sueltas |
| 4 | **Distractores** | Trampas plausibles de TOEIC (forma, vocabulario cercano, conector de otra relación lógica, oración que no encaja en el discurso) | Nonsense, o más de una respuesta defendible en contexto |
| 5 | **Explicación** | Enseña por qué la clave encaja **en el pasaje**; `commonMistake` nombra la trampa típica | Solo traduce la clave, ignora el contexto del pasaje, o no menciona el error común |

## Tipos de blank (oficial Part 6)

1. **word_form** — forma gramatical / parte de la oración (adj vs adv, noun vs verb, etc.)
2. **vocabulary** — palabra o frase corta de sentido en contexto laboral
3. **connector** — conector discursivo (however, therefore, in addition, as a result…)
4. **sentence_insertion** — insertar la **oración** A–D que mejor completa el hueco según coherencia del pasaje

## Política de curación (Israel)

- Demos / intro libre: más livianos OK (salvo bug crítico).
- Guiada + mocks: **solo** pasajes validados (rubric ≥ 4.0).
- Todo el contenido es **original** (no stems ni pasajes con copyright de ETS).
- Dificultad: mayormente 2–3, algunos 4; evitar banco todo-fácil.
- Mix por lote (~16 Q = 4 pasajes): idealmente ~1 de cada `blankType` por pasaje, o al menos **varios** `sentence_insertion` en el lote.
- Géneros rotados: email, letter, memo, notice, ad, article.

## Banderas automáticas de rechazo

- Claves dobles / ambigüedad en contexto
- Sentence insertion con opciones que no son oraciones
- Blank sin marcador en `text[]`
- Pasaje que no se lee como documento laboral real
- Sensación de examen de traducción palabra por palabra
