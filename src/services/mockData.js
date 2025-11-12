/**
 * Mock Data para desarrollo y pruebas
 * Simula datos del backend sin necesidad de un servidor real
 */

import { getAvatarByUserId } from '../utils/constants'

// Usuarios mock (tabla: users)
export const mockUsuarios = [
  {
    _id: '1',
    nombre: 'Admin Usuario',
    correo: 'admin@example.com',
    rol: 'admin',
    avatar: getAvatarByUserId('1'),
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString(),
  },
  {
    _id: '2',
    nombre: 'Juan Pérez',
    correo: 'juan@example.com',
    rol: 'user',
    avatar: getAvatarByUserId('2'),
    createdAt: new Date('2024-02-20').toISOString(),
    updatedAt: new Date('2024-02-20').toISOString(),
  },
  {
    _id: '3',
    nombre: 'María García',
    correo: 'maria@example.com',
    rol: 'user',
    avatar: getAvatarByUserId('3'),
    createdAt: new Date('2024-03-10').toISOString(),
    updatedAt: new Date('2024-03-10').toISOString(),
  },
]

// Descripciones de usuarios mock (tabla: userdescriptions)
export const mockUserDescriptions = [
  {
    _id: 'desc1',
    usuario: '1',
    biografia: 'Administrador del blog. Apasionado por la salud mental y el bienestar emocional.',
  },
  {
    _id: 'desc2',
    usuario: '2',
    biografia: 'Escribo sobre mis experiencias con la ansiedad y cómo las supero día a día.',
  },
  {
    _id: 'desc3',
    usuario: '3',
    biografia:
      'Amante del autocuidado y la meditación. Comparto tips para una vida más equilibrada.',
  },
]

// Posts de Blog mock (públicos para todos)
export const mockNotas = [
  {
    _id: '1',
    titulo: 'Comprendiendo la Depresión: No estás solo',
    resumen:
      'La depresión es más común de lo que pensamos. Afecta a millones de personas en todo el mundo y es importante entender que buscar ayuda no es una señal de debilidad, sino de fortaleza.',
    contenido: `La depresión es más común de lo que pensamos. Afecta a millones de personas en todo el mundo y es importante entender que buscar ayuda no es una señal de debilidad, sino de fortaleza.

![Persona reflexionando](https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=500&fit=crop)

## ¿Qué es la Depresión?

La depresión es un trastorno del estado de ánimo que causa sentimientos persistentes de tristeza y pérdida de interés. No es simplemente sentirse triste por unos días; es una condición médica seria que afecta cómo piensas, sientes y manejas las actividades diarias.

## Síntomas Comunes

Los síntomas de la depresión pueden variar de persona a persona, pero algunos de los más comunes incluyen:

- Sentimientos persistentes de tristeza, ansiedad o "vacío"
- Pérdida de interés en actividades que antes disfrutabas
- Cambios en el apetito o peso
- Problemas para dormir o dormir demasiado
- Falta de energía y fatiga constante
- Dificultad para concentrarse o tomar decisiones
- Pensamientos de muerte o suicidio

## Primeros Pasos para Buscar Ayuda

![Apoyo y conexión](https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&h=500&fit=crop)

Si reconoces estos síntomas en ti mismo o en alguien cercano, aquí hay algunos pasos que puedes tomar:

1. **Habla con alguien de confianza**: Compartir lo que estás sintiendo con un amigo, familiar o mentor puede ser el primer paso hacia la recuperación.

2. **Busca ayuda profesional**: Un psicólogo o psiquiatra puede diagnosticar correctamente la depresión y recomendar el tratamiento adecuado.

3. **Mantén una rutina**: Establecer horarios regulares para dormir, comer y hacer ejercicio puede ayudar a estabilizar tu estado de ánimo.

4. **Practica el autocuidado**: Dedica tiempo a actividades que te hagan sentir bien, aunque no tengas ganas.

## Recuerda

La depresión es tratable. Con el apoyo adecuado, la mayoría de las personas con depresión pueden recuperarse y vivir vidas plenas y satisfactorias. No estás solo en esto.`,
    categoria: 'personal',
    usuario: '1',
    autor: 'Admin Usuario',
    createdAt: new Date('2024-04-01').toISOString(),
    updatedAt: new Date('2024-04-01').toISOString(),
  },
  {
    _id: '2',
    titulo: 'Técnicas de Mindfulness para el Día a Día',
    resumen:
      'El mindfulness o atención plena puede transformar tu manera de vivir el presente. Aprende técnicas sencillas que puedes aplicar en tu rutina diaria.',
    contenido: `El mindfulness o atención plena puede transformar tu manera de vivir el presente. En nuestro mundo acelerado, es fácil perderse en pensamientos sobre el pasado o preocupaciones sobre el futuro. El mindfulness nos devuelve al ahora.

![Meditación al aire libre](https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=500&fit=crop)

## ¿Qué es el Mindfulness?

El mindfulness es la práctica de estar completamente presente en el momento actual, observando tus pensamientos y sentimientos sin juzgarlos. No se trata de vaciar la mente, sino de ser consciente de lo que está sucediendo dentro y fuera de ti.

## Técnicas Prácticas para Principiantes

![Respiración consciente](https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=500&fit=crop)

### 1. Respiración Consciente (5 minutos)

- Siéntate cómodamente y cierra los ojos
- Respira naturalmente y enfoca tu atención en tu respiración
- Nota cómo el aire entra y sale de tu cuerpo
- Cuando tu mente divague, gentilmente devuelve tu atención a la respiración

### 2. Escaneo Corporal

Tómate 10 minutos para recorrer mentalmente tu cuerpo desde la cabeza hasta los pies, notando cualquier sensación sin intentar cambiarla.

### 3. Mindful Walking

Camina lentamente, prestando atención a cada paso, al contacto de tus pies con el suelo, al movimiento de tu cuerpo.

### 4. Alimentación Consciente

Come sin distracciones, saboreando cada bocado, notando texturas, sabores y aromas.

## Beneficios Comprobados

- Reducción del estrés y la ansiedad
- Mejora de la concentración
- Mayor regulación emocional
- Mejor calidad del sueño
- Aumento de la autoconciencia

## Integrando el Mindfulness en tu Rutina

No necesitas horas de meditación. Comienza con 5 minutos al día y aumenta gradualmente. Lo importante es la consistencia, no la duración.`,
    categoria: 'estudio',
    usuario: '1',
    autor: 'Admin Usuario',
    createdAt: new Date('2024-04-05').toISOString(),
    updatedAt: new Date('2024-04-05').toISOString(),
  },
  {
    _id: '3',
    titulo: 'La Importancia del Autocuidado en Tiempos Difíciles',
    resumen:
      'Cuidar de ti mismo no es egoísmo, es una necesidad. El autocuidado incluye aspectos físicos, emocionales y mentales.',
    contenido: `Cuidar de ti mismo no es egoísmo, es una necesidad. En tiempos difíciles, el autocuidado se convierte en una herramienta esencial para mantener nuestra salud mental y emocional.

![Autocuidado y bienestar](https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=500&fit=crop)

## ¿Qué es el Autocuidado?

El autocuidado son todas las actividades y prácticas que realizamos de manera regular para reducir el estrés y mantener nuestra salud y bienestar. No se trata de lujos ocasionales, sino de hábitos cotidianos que nutren nuestro cuerpo, mente y espíritu.

## Dimensiones del Autocuidado

![Ejercicio y salud](https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=500&fit=crop)

### 1. Autocuidado Físico

- **Ejercicio regular**: Al menos 30 minutos diarios de actividad física
- **Alimentación balanceada**: Priorizar alimentos nutritivos y naturales
- **Sueño de calidad**: 7-9 horas por noche
- **Hidratación**: Beber suficiente agua durante el día

### 2. Autocuidado Emocional

- Reconocer y validar tus emociones
- Expresar sentimientos de manera saludable
- Practicar la autocompasión
- Establecer límites saludables con otros

### 3. Autocuidado Mental

- Tiempo para hobbies y actividades que disfrutas
- Aprendizaje continuo y estimulación mental
- Descansos regulares del trabajo y responsabilidades
- Práctica de mindfulness o meditación

### 4. Autocuidado Social

- Mantener conexiones significativas con seres queridos
- Pedir ayuda cuando la necesitas
- Participar en comunidades de apoyo
- Establecer límites con relaciones tóxicas

## Rutinas Simples de Autocuidado

**Rutina Matutina (15 minutos):**
1. Estiramientos suaves
2. Respiración consciente
3. Establecer una intención para el día

**Rutina Vespertina (20 minutos):**
1. Desconexión de pantallas 1 hora antes de dormir
2. Ducha o baño relajante
3. Lectura o journaling
4. Gratitud: anotar 3 cosas positivas del día

## Señales de que Necesitas Más Autocuidado

- Irritabilidad constante
- Fatiga crónica
- Dificultad para concentrarte
- Dolores físicos sin causa médica
- Aislamiento social
- Descuido de responsabilidades básicas

## Recuerda

**No puedes servir de una copa vacía.** Cuidar de ti mismo te permite tener la energía y la capacidad emocional para cuidar de otros y enfrentar los desafíos de la vida. El autocuidado no es egoísmo; es responsabilidad.`,
    categoria: 'personal',
    usuario: '2',
    autor: 'Juan Pérez',
    createdAt: new Date('2024-04-10').toISOString(),
    updatedAt: new Date('2024-04-10').toISOString(),
  },
  {
    _id: '4',
    titulo: 'Reconociendo las Señales de Ansiedad',
    resumen:
      'La ansiedad puede manifestarse de muchas formas: pensamientos acelerados, tensión muscular, problemas de sueño. Aprender a identificar estas señales es el primer paso.',
    contenido: `La ansiedad es la respuesta natural del cuerpo al estrés. Es un sentimiento de miedo o aprensión sobre lo que está por venir. Sin embargo, cuando la ansiedad se vuelve abrumadora, puede interferir significativamente con la vida diaria.

![Manejo de la ansiedad](https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?w=800&h=500&fit=crop)

## Señales Físicas de Ansiedad

- Corazón acelerado o palpitaciones
- Sudoración excesiva
- Tensión muscular, especialmente en cuello y hombros
- Problemas digestivos
- Fatiga constante
- Problemas para dormir

## Señales Emocionales

- Preocupación constante y excesiva
- Sensación de peligro inminente
- Irritabilidad
- Dificultad para concentrarse
- Evitar situaciones sociales

## Técnicas de Manejo Inmediato

![Técnicas de relajación](https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=800&h=500&fit=crop)

### Respiración 4-7-8
1. Inhala por 4 segundos
2. Mantén por 7 segundos
3. Exhala por 8 segundos

### Grounding 5-4-3-2-1
Identifica:
- 5 cosas que puedes **ver**
- 4 cosas que puedes **tocar**
- 3 cosas que puedes **escuchar**
- 2 cosas que puedes **oler**
- 1 cosa que puedes **saborear**

## Cuándo Buscar Ayuda Profesional

Es momento de consultar con un profesional si:
- La ansiedad interfiere con tu vida diaria
- Tienes ataques de pánico frecuentes
- Evitas situaciones importantes por ansiedad
- Experimentas síntomas físicos persistentes

La terapia cognitivo-conductual y, en algunos casos, la medicación pueden ser muy efectivas para manejar la ansiedad.`,
    categoria: 'estudio',
    usuario: '1',
    autor: 'Admin Usuario',
    createdAt: new Date('2024-04-15').toISOString(),
    updatedAt: new Date('2024-04-15').toISOString(),
  },
  {
    _id: '5',
    titulo: 'Construyendo una Red de Apoyo',
    resumen:
      'Nadie debe enfrentar sus batallas solo. Una red de apoyo sólida incluye familia, amigos, profesionales de salud mental y grupos de apoyo.',
    contenido: `Nadie debe enfrentar sus batallas solo. Una red de apoyo sólida es fundamental para mantener la salud mental y superar momentos difíciles. Es uno de los factores más importantes para la resiliencia.

![Comunidad y apoyo](https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=500&fit=crop)

## Componentes de una Red de Apoyo

### 1. Familia y Amigos Cercanos
Las personas que te conocen mejor y pueden ofrecer apoyo emocional incondicional.

### 2. Profesionales de Salud Mental
Psicólogos, psiquiatras y consejeros que proporcionan apoyo experto y estrategias de afrontamiento.

### 3. Grupos de Apoyo
Personas que están pasando por experiencias similares pueden ofrecer comprensión única y consejos prácticos.

### 4. Mentores o Modelos a Seguir
Personas que han superado desafíos similares y pueden inspirar esperanza.

## Cómo Fortalecer Tu Red de Apoyo

![Conexión humana](https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=500&fit=crop)

- **Comunica tus necesidades**: Sé claro sobre cómo otros pueden ayudarte
- **Mantén el contacto regular**: No esperes hasta una crisis para conectarte
- **Sé recíproco**: Ofrece apoyo a otros cuando puedas
- **Únete a comunidades**: En línea o presenciales, busca grupos con intereses comunes
- **Acepta la ayuda**: Permite que otros te apoyen cuando lo necesites

## Pedir Ayuda es Fortaleza

Pedir ayuda no es señal de debilidad. Al contrario, reconocer que necesitas apoyo y buscarlo activamente es un acto de fortaleza y autocuidado.

Recuerda: **Está bien no estar bien, y está bien pedir ayuda.**`,
    categoria: 'personal',
    usuario: '2',
    autor: 'Juan Pérez',
    createdAt: new Date('2024-04-20').toISOString(),
    updatedAt: new Date('2024-04-20').toISOString(),
  },
  {
    _id: '6',
    titulo: 'Ejercicio y Salud Mental: Una Conexión Poderosa',
    resumen:
      'El ejercicio no solo beneficia tu cuerpo, sino también tu mente. La actividad física regular libera endorfinas, reduce el estrés y mejora el estado de ánimo.',
    contenido: `El ejercicio es una de las herramientas más poderosas y accesibles para mejorar la salud mental. La conexión entre actividad física y bienestar emocional está respaldada por décadas de investigación científica.

![Ejercicio al aire libre](https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=500&fit=crop)

## Beneficios del Ejercicio para la Salud Mental

### Beneficios Inmediatos
- **Liberación de endorfinas**: Las "hormonas de la felicidad"
- **Reducción del estrés**: Disminuye cortisol (hormona del estrés)
- **Mejora del estado de ánimo**: Efectos positivos notables después de solo 10 minutos

### Beneficios a Largo Plazo
- Reduce síntomas de depresión y ansiedad
- Mejora la autoestima y confianza
- Mejor calidad del sueño
- Mayor claridad mental y concentración
- Aumenta la resiliencia al estrés

## Tipos de Ejercicio Beneficiosos

![Yoga y bienestar](https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&h=500&fit=crop)

### Aeróbico (Cardio)
- Caminar rápido
- Correr
- Nadar
- Bailar
- Ciclismo

### Entrenamiento de Fuerza
Mejora la autoestima y proporciona sensación de logro.

### Yoga y Tai Chi
Combinan movimiento con mindfulness, reduciendo ansiedad y estrés.

## Cómo Empezar

![Actividad física](https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=500&fit=crop)

**No necesitas un gimnasio costoso o equipamiento especial.**

### Semana 1-2: Establece el Hábito
- 10-15 minutos al día
- Caminar alrededor de tu barrio
- Enfócate en la consistencia, no en la intensidad

### Semana 3-4: Aumenta Gradualmente
- 20-30 minutos
- Agrega variedad: caminar, bailar, yoga

### Mes 2 en adelante
- 30-45 minutos, 5 días a la semana
- Encuentra actividades que disfrutes

## Consejos para Mantener la Motivación

1. **Encuentra un compañero**: Hacer ejercicio con alguien más aumenta la adherencia
2. **Establece metas realistas**: Pequeños logros sostenibles
3. **Varía tu rutina**: Previene el aburrimiento
4. **Celebra tus logros**: Reconoce tu progreso
5. **Sé amable contigo mismo**: Algunos días serán más difíciles que otros

Recuerda: **El mejor ejercicio es el que realmente haces**. Encuentra algo que disfrutes y hazlo consistentemente.`,
    categoria: 'trabajo',
    usuario: '1',
    autor: 'Admin Usuario',
    createdAt: new Date('2024-04-25').toISOString(),
    updatedAt: new Date('2024-04-25').toISOString(),
  },
  {
    _id: '7',
    titulo: 'Mi Viaje con la Ansiedad: Lecciones Aprendidas',
    resumen:
      'Compartir mi experiencia personal con la ansiedad me ha ayudado a sanar. Aquí les cuento las estrategias que me funcionaron y las lecciones más importantes que aprendí en el camino.',
    contenido: `Durante años, la ansiedad fue mi compañera constante. Ataques de pánico en lugares públicos, noches sin dormir, preocupaciones que no me dejaban vivir. Hoy quiero compartir mi historia porque sé que no estoy solo, y si tú estás pasando por algo similar, quiero que sepas que hay esperanza.

![Superación personal](https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&h=500&fit=crop)

## El Inicio: Reconocer el Problema

Todo comenzó hace tres años. Recuerdo la primera vez que tuve un ataque de pánico en el supermercado. Mi corazón latía tan rápido que pensé que me estaba dando un infarto. Las manos me sudaban, me faltaba el aire, y lo único que quería era salir corriendo.

Durante meses negué lo que me estaba pasando. "Es solo estrés", me decía. "Se va a pasar solo". Pero no pasaba. Cada día era una batalla contra pensamientos que no podía controlar.

## Buscar Ayuda: El Primer Paso Real

El día que decidí buscar ayuda profesional fue el día que empezó mi verdadera recuperación. Mi terapeuta me ayudó a entender que:

- La ansiedad no es debilidad
- No estoy roto, solo necesito herramientas
- La recuperación es posible, aunque no sea lineal

![Terapia y apoyo](https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=500&fit=crop)

## Estrategias que Me Funcionaron

### 1. Llevar un Diario de Ansiedad

Escribir sobre mis preocupaciones me ayudó a identificar patrones. Descubrí que mi ansiedad empeoraba:
- Cuando no dormía bien
- Después de tomar mucho café
- En situaciones sociales específicas

### 2. Técnica de los 5 Sentidos

Cuando sentía que un ataque de pánico se aproximaba, usaba esta técnica:
- Nombrar 5 cosas que veo
- 4 cosas que puedo tocar
- 3 que puedo escuchar
- 2 que puedo oler
- 1 que puedo saborear

Esto me devuelve al presente y frena el espiral de pensamientos.

### 3. Movimiento Diario

![Caminar y reflexionar](https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=500&fit=crop)

Caminar 30 minutos cada mañana se convirtió en mi ritual sagrado. No importaba el clima, salía a caminar. El movimiento ayuda a liberar la tensión física que la ansiedad crea en mi cuerpo.

### 4. Límites con las Redes Sociales

Reducir mi tiempo en redes sociales fue un cambio radical. El scroll infinito alimentaba mi ansiedad de manera que no había reconocido antes.

## Lo Que Aprendí en el Camino

**La recuperación no es lineal.** Hay días buenos y días malos. Y está bien.

**Pedir ayuda es valentía, no debilidad.** Hablar con mi familia, mis amigos, mi terapeuta... cada conversación me hizo más fuerte.

**El autocuidado no es egoísmo.** Decir "no" a compromisos que me agotaban fue liberador.

**Las recaídas no son fracasos.** Son parte del proceso. Cada vez que vuelvo a levantarme, soy más resiliente.

## Un Mensaje para Ti

Si estás luchando con ansiedad ahora mismo, quiero que sepas:

- No estás solo en esto
- Tu lucha es válida
- Mereces sentirte bien
- La ayuda funciona
- Vas a estar bien

![Esperanza y futuro](https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=500&fit=crop)

La ansiedad todavía es parte de mi vida, pero ya no me controla. He aprendido a vivir con ella, a reconocer sus señales, a usar mis herramientas. Algunos días son más difíciles que otros, pero cada día es una oportunidad para practicar la compasión conmigo mismo.

**Tu historia de recuperación también es posible. No te rindas.**`,
    categoria: 'personal',
    usuario: '2',
    autor: 'Juan Pérez',
    createdAt: new Date('2024-05-01').toISOString(),
    updatedAt: new Date('2024-05-01').toISOString(),
  },
  {
    _id: '8',
    titulo: 'Meditación para Principiantes: Una Guía Práctica',
    resumen:
      'La meditación transformó mi vida. Si crees que "no puedes meditar" o que "tu mente está muy activa", esta guía es para ti. Te enseño cómo empecé desde cero.',
    contenido: `Hace un año, si me hubieras dicho que meditaría todos los días, me habría reído. "Yo no puedo quedarme quieta", pensaba. "Mi mente nunca para". Pero aquí estoy, 365 días después, compartiendo cómo la meditación se convirtió en mi práctica más preciada.

![Meditación matutina](https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800&h=500&fit=crop)

## Desmitificando la Meditación

Primero, dejemos claros algunos mitos:

**Mito 1: "Tienes que vaciar tu mente"**
- Realidad: La mente produce pensamientos. Es su trabajo. Meditar es observarlos sin engancharte.

**Mito 2: "Necesitas meditar por horas"**
- Realidad: 5 minutos diarios son más valiosos que 1 hora cada domingo.

**Mito 3: "Debes sentarte en posición de loto"**
- Realidad: Puedes meditar sentado en una silla, acostado, o incluso caminando.

## Mi Primer Intento (y Fracaso)

Mi primera meditación duró exactamente 47 segundos. Me senté, cerré los ojos, y mi mente explotó:

*"¿Estoy respirando bien? Tengo que contestar ese email. ¿Por qué me pica la nariz? Esto es ridículo. No sirvo para esto."*

Me levanté frustrada. Pero algo me hizo intentarlo de nuevo al día siguiente.

## Cómo Empezar: Guía Paso a Paso

![Espacio de meditación](https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800&h=500&fit=crop)

### Semana 1: Solo Respira (2 minutos)

**Día 1-7:**
1. Siéntate cómodamente
2. Cierra los ojos (o mira hacia abajo suavemente)
3. Pon atención a tu respiración
4. Cuando notes que tu mente divagó, vuelve a la respiración
5. Repite por 2 minutos

**Consejo:** Usa un temporizador. No te preocupes por "hacerlo bien". Si notaste que tu mente divagó, ¡felicidades! Eso ES meditación.

### Semana 2: Escaneo Corporal (5 minutos)

Una vez que los 2 minutos se sientan cómodos, prueba esto:

1. Empieza con la respiración (1 minuto)
2. Lleva tu atención a tus pies
3. Nota cualquier sensación sin juzgar
4. Sube lentamente por tu cuerpo
5. Termina volviendo a la respiración

### Semana 3: Mantras Simples (5-10 minutos)

Introduce una palabra o frase que repites mentalmente:
- "Paz" (al inhalar), "Calma" (al exhalar)
- "Estoy" (inhalar), "Aquí" (exhalar)
- "Soltar" (inhalar), "Confiar" (exhalar)

## Obstáculos Comunes y Soluciones

### "Me quedo dormida"

**Solución:** Medita por la mañana, sentada en vez de acostada, con los ojos semi-abiertos.

### "No puedo parar mis pensamientos"

**Solución:** No tienes que pararlos. Solo observa cómo vienen y van, como nubes en el cielo.

### "No tengo tiempo"

**Solución:** ¿Tienes tiempo para revisar Instagram? Entonces tienes 5 minutos para meditar.

### "No siento nada especial"

**Solución:** La meditación no es sobre sentir algo especial. Es entrenamiento mental, como ir al gimnasio.

## Mi Rutina Actual

![Espacio tranquilo](https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&h=500&fit=crop)

**Cada mañana a las 6:30 AM:**

1. **Preparación (2 min):** Me siento en mi cojín favorito, enciendo una vela
2. **Respiración (5 min):** Solo observo mi respiración natural
3. **Gratitud (3 min):** Pienso en 3 cosas por las que estoy agradecida
4. **Intención (2 min):** Establezco mi intención para el día
5. **Cierre (1 min):** Llevo mi atención de vuelta a mi cuerpo

Total: 13 minutos que cambiaron mi vida.

## Beneficios que Experimenté

Después de un mes de práctica diaria:
- Menos reactiva ante el estrés
- Mejor calidad de sueño
- Mayor claridad mental
- Más compasión conmigo misma
- Relaciones más conscientes

## Apps que Recomiendo

Para principiantes:
- **Insight Timer:** Gratis, con miles de meditaciones guiadas
- **Calm:** Excelentes visuales y música
- **Headspace:** Muy didáctica para empezar

## Mi Consejo Más Importante

**No busques perfección. Busca consistencia.**

Prefiero 5 minutos diarios que 1 hora una vez al mes. La magia está en la repetición, en el compromiso contigo misma día tras día.

![Paz interior](https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=500&fit=crop)

Algunos días mi meditación es profunda y reveladora. Otros días, mi mente es como un mono saltando de rama en rama. Ambos son válidos. Ambos son práctica.

**Si yo pude, tú puedes.** No necesitas ser espiritual, flexible, o paciente. Solo necesitas estar dispuesta a intentarlo, día tras día.

¿Listo para empezar? Todo lo que necesitas es este momento, tu respiración, y la intención de estar presente.

**Namaste** 🙏`,
    categoria: 'estudio',
    usuario: '3',
    autor: 'María García',
    createdAt: new Date('2024-05-05').toISOString(),
    updatedAt: new Date('2024-05-05').toISOString(),
  },
]

// Comentarios mock (solo usuarios autenticados pueden comentar)
export const mockComentarios = [
  {
    _id: '1',
    notaId: '1',
    usuario: '2',
    autor: 'Juan Pérez',
    contenido: 'Excelente artículo, me ayudó mucho a entender lo que estaba sintiendo.',
    createdAt: new Date('2024-04-02').toISOString(),
  },
  {
    _id: '2',
    notaId: '1',
    usuario: '3',
    autor: 'María García',
    contenido: 'Gracias por compartir esto. Es importante hablar de estos temas.',
    createdAt: new Date('2024-04-03').toISOString(),
  },
  {
    _id: '3',
    notaId: '3',
    usuario: '1',
    autor: 'Admin Usuario',
    contenido: 'Me alegra que estés practicando el autocuidado. Sigue así!',
    createdAt: new Date('2024-04-11').toISOString(),
  },
  {
    _id: '3',
    notaId: '2',
    usuario: '3',
    autor: 'María García',
    contenido: 'Interesante ...',
    createdAt: new Date('2024-04-11').toISOString(),
  },
]

// Usuario actual (simulado como login)
let currentUser = null
let authToken = null

// Helpers para manejo de estado
export const setCurrentUser = (user, token) => {
  currentUser = user
  authToken = token
}

export const getCurrentMockUser = () => currentUser
export const getMockToken = () => authToken
export const clearMockAuth = () => {
  currentUser = null
  authToken = null
}
