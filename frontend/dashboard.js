/* ==========================================
   COUNTERS
========================================== */

class DashboardCounters {
  constructor() {
    this.counters =
      document.querySelectorAll("[data-counter]");

    this.init();
  }

  init() {
    this.counters.forEach(counter => {
      this.animate(counter);
    });
  }

  animate(counter) {
    const target =
      parseInt(counter.dataset.counter);

    let current = 0;

    const increment = target / 120;

    const update = () => {

      current += increment;

      if (current >= target) {
        counter.textContent =
          target.toLocaleString("pt-BR");
        return;
      }

      counter.textContent =
        Math.floor(current)
          .toLocaleString("pt-BR");

      requestAnimationFrame(update);
    };

    update();
  }
}

/* ==========================================
   CHART
========================================== */

class DashboardChart {

  constructor() {
    this.canvas =
      document.getElementById(
        "performanceChart"
      );

    if (!this.canvas) return;

    this.create();
  }

  create() {

    new Chart(this.canvas, {

      type: "line",

      data: {

        labels: [
          "Jan",
          "Fev",
          "Mar",
          "Abr",
          "Mai",
          "Jun",
          "Jul",
          "Ago"
        ],

        datasets: [

          {
            label: "Aprovação",

            data: [
              72,
              76,
              81,
              84,
              88,
              92,
              95,
              98
            ],

            tension: 0.4,

            borderWidth: 4,

            borderColor:
              "#7c3aed",

            fill: true,

            backgroundColor:
              "rgba(124,58,237,.15)"
          }

        ]
      },

      options: {

        responsive: true,

        plugins: {
          legend: {
            display: false
          }
        },

        scales: {

          x: {
            grid: {
              color:
              "rgba(255,255,255,.05)"
            }
          },

          y: {
            grid: {
              color:
              "rgba(255,255,255,.05)"
            }
          }

        }

      }

    });

  }

}

/* ==========================================
   NOTIFICATIONS
========================================== */

class DashboardNotifications {

  constructor() {

    this.createContainer();

    this.start();

  }

  createContainer() {

    this.container =
      document.createElement("div");

    this.container.className =
      "notifications";

    document.body.appendChild(
      this.container
    );

  }

  notify(message) {

    const item =
      document.createElement("div");

    item.className =
      "notification";

    item.innerHTML = message;

    this.container.appendChild(item);

    setTimeout(() => {
      item.classList.add("show");
    }, 50);

    setTimeout(() => {

      item.classList.remove("show");

      setTimeout(() => {
        item.remove();
      }, 500);

    }, 5000);

  }

  start() {

    const messages = [

      "🎓 Nova matrícula registrada",

      "📚 Curso atualizado",

      "🏆 Meta de aprovação atingida",

      "👨‍🏫 Novo professor adicionado",

      "📝 Nova avaliação criada"

    ];

    setInterval(() => {

      const random =
        messages[
          Math.floor(
            Math.random() *
            messages.length
          )
        ];

      this.notify(random);

    }, 12000);

  }

}

/* ==========================================
   LIVE STATS
========================================== */

class LiveStats {

  constructor() {

    this.cards =
      document.querySelectorAll(
        ".stat-card h2"
      );

    this.start();

  }

  start() {

    setInterval(() => {

      this.cards.forEach(card => {

        const current =
          Number(
            card.textContent
            .replace(/\./g,"")
          );

        const next =
          current +
          Math.floor(
            Math.random()*3
          );

        card.textContent =
          next.toLocaleString(
            "pt-BR"
          );

      });

    }, 15000);

  }

}

/* ==========================================
   THEME SYSTEM
========================================== */

class DashboardTheme {

  constructor() {

    this.theme =
      localStorage.getItem(
        "dashboard-theme"
      ) || "dark";

    this.createButton();

    this.apply();

  }

  createButton() {

    const top =
      document.querySelector(
        ".top-actions"
      );

    if (!top) return;

    this.button =
      document.createElement(
        "button"
      );

    this.button.className =
      "action-btn";

    this.button.innerHTML =
      "🌙";

    top.prepend(
      this.button
    );

    this.button.addEventListener(
      "click",
      () => {

        this.theme =
          this.theme === "dark"
          ? "light"
          : "dark";

        localStorage.setItem(
          "dashboard-theme",
          this.theme
        );

        this.apply();

      }
    );

  }

  apply() {

    document.body.classList.toggle(
      "light-mode",
      this.theme === "light"
    );

    if (this.button) {

      this.button.innerHTML =
        this.theme === "light"
        ? "☀️"
        : "🌙";

    }

  }

}

/* ==========================================
   SIDEBAR TOGGLE
========================================== */

class SidebarToggle {

  constructor() {

    this.create();

  }

  create() {

    const topbar =
      document.querySelector(
        ".topbar"
      );

    if (!topbar) return;

    const btn =
      document.createElement(
        "button"
      );

    btn.className =
      "action-btn";

    btn.innerHTML = "☰";

    topbar.prepend(btn);

    btn.addEventListener(
      "click",
      () => {

        const sidebar =
          document.querySelector(
            ".sidebar"
          );

        sidebar.classList.toggle(
          "mobile-open"
        );

      }
    );

  }

}

/* ==========================================
   APP
========================================== */

class DashboardApp {

  constructor() {

    new DashboardCounters();

    new DashboardChart();

    new DashboardNotifications();

    new LiveStats();

    new DashboardTheme();

    new SidebarToggle();

    console.log(
      "🚀 Anglo Dashboard Online"
    );

  }

}

document.addEventListener(
  "DOMContentLoaded",
  () => {

    new DashboardApp();

  }
);
document.getElementById("logoutBtn").addEventListener("click", () => {

    // Remove dados da sessão
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Volta para a página de login
    window.location.href = "index.html";
});
const dashboardStats = {
  alunos: 2847,
  professores: 126,
  cursos: 48,
  aprovacao: "97.8%",
  receita: "R$ 184.500"
};
const alunos = [
  {
    id: 1,
    nome: "Lucas Almeida",
    turma: "3º Ano A",
    curso: "Ensino Médio",
    media: 9.2,
    status: "Ativo"
  },
  {
    id: 2,
    nome: "Mariana Costa",
    turma: "2º Ano B",
    curso: "Ensino Médio",
    media: 8.7,
    status: "Ativo"
  },
  {
    id: 3,
    nome: "Pedro Henrique",
    turma: "1º Ano A",
    curso: "Ensino Médio",
    media: 7.9,
    status: "Ativo"
  }
];
const professores = [
  {
    nome: "Carlos Silva",
    disciplina: "Matemática",
    experiencia: "12 anos",
    avaliacao: 4.9
  },
  {
    nome: "Fernanda Souza",
    disciplina: "Português",
    experiencia: "8 anos",
    avaliacao: 4.8
  },
  {
    nome: "Ricardo Gomes",
    disciplina: "Física",
    experiencia: "15 anos",
    avaliacao: 5.0
  }
];
const cursos = [
  {
    nome: "Ensino Fundamental",
    alunos: 932,
    duracao: "9 anos"
  },
  {
    nome: "Ensino Médio",
    alunos: 1287,
    duracao: "3 anos"
  },
  {
    nome: "Pré-Vestibular",
    alunos: 628,
    duracao: "1 ano"
  }
];
const provas = [
  {
    titulo: "Matemática Avançada",
    data: "20/06/2026",
    turma: "3º Ano A"
  },
  {
    titulo: "Física Moderna",
    data: "22/06/2026",
    turma: "2º Ano B"
  },
  {
    titulo: "Redação ENEM",
    data: "25/06/2026",
    turma: "Pré-Vestibular"
  }
];
const mensagens = [
  {
    usuario: "Coordenação",
    mensagem: "Reunião pedagógica sexta-feira às 14h."
  },
  {
    usuario: "Diretoria",
    mensagem: "Novo calendário acadêmico disponível."
  },
  {
    usuario: "Secretaria",
    mensagem: "Atualização dos dados cadastrais."
  }
];
const notificacoes = [
  "Nova matrícula realizada",
  "Professor adicionado ao sistema",
  "Prova criada com sucesso",
  "Relatório mensal gerado",
  "Backup automático concluído"
];
const atividades = [
  {
    hora: "09:12",
    evento: "Lucas Almeida realizou matrícula"
  },
  {
    hora: "10:45",
    evento: "Nova prova publicada"
  },
  {
    hora: "11:30",
    evento: "Relatório financeiro gerado"
  },
  {
    hora: "13:15",
    evento: "Novo professor cadastrado"
  }
];
const eventos = [
  {
    titulo: "Prova de Matemática",
    data: "20/06"
  },
  {
    titulo: "Simulado ENEM",
    data: "24/06"
  },
  {
    titulo: "Reunião de Pais",
    data: "28/06"
  }
];
