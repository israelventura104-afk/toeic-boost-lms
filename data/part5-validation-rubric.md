# Rúbrica de validación — TOEIC Boost Part 5 (banco de clase)

**Uso:** Solo ítems de `part5-bank.json` (práctica guiada y mocks). El intro gratuito (`part5-intro.json`) no se valida con este estricto.  
**Meta:** 40 ítems validados, IDs `TQB-P5-0011` … `TQB-P5-0050`.  
**Umbral:** promedio ≥ 4.0 en las 5 dimensiones **y** ninguna dimensión < 3.

## Dimensiones (1–5)

| # | Dimensión | 5 = excelente | Rechazar si… |
|---|-----------|---------------|--------------|
| 1 | **Formato** | Un blank, exactamente 4 opciones A–D, `correctKey` coincide con el texto de `correctAnswer`, el blank es un solo slot gramatical | Doble blank, 3/5 opciones, clave ambigua, opciones que son cláusulas enteras cuando el stem pide palabra/frase corta |
| 2 | **Autenticidad TOEIC Part 5** | Registro laboral/negocios (oficina, RR.HH., viajes, ventas, reuniones, finanzas, logística); longitud/complejidad tipo Incomplete Sentences | Tono académico/campus (estilo TOEFL), slang idiomático, obscuridad cultural, stem demasiado largo |
| 3 | **Claridad de skill** | La etiqueta `skill` coincide con lo que realmente evalúa el ítem; las pistas del stem apoyan esa skill | Skill mal etiquetada (p. ej. *unless* como Conditional) |
| 4 | **Distractores** | Trampas plausibles de TOEIC (forma de palabra, concordancia, prep., etc.) | Nonsense, o más de una respuesta defendible |
| 5 | **Explicación** | Enseña la regla; `commonMistake` nombra la trampa típica | Solo traduce la clave, o no menciona el error común |

## Política de curación (Israel)

- Demos / intro libre: dejar como están (salvo bug crítico).
- Guiada + mocks: **solo** ítems validados alineados a Part 5 real.
- Preferir reescrituras de calidad a conservar ítems débiles.
- Todo el contenido es **original** (no stems con copyright de ETS).
- Dificultad: mayormente 2–3, algunos 4; evitar banco todo-fácil.
- Balance: ~3–4 ítems por cada una de las 12 skills.

## Banderas automáticas de rechazo

- Claves dobles / ambigüedad
- Opción “—” / em-dash para artículo cero (atípico en Part 5; reescribir)
- Sensación de examen de traducción
- Ítems d=1 demasiado fáciles para el banco de clase (salvo excepción justificada)
