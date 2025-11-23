import AppIcon, { SCENECHANGE } from "../Elements/AppIcon";
import Position from "../Position";
import Scene from "./Scene";

/**
 * ============================================
 * LISTA DE CENAS DO JOGO
 * ============================================
 *
 * COMO ADICIONAR PONTOS:
 *
 * Todas as clickFunction agora recebem o gameState como parâmetro.
 * Use gameState para adicionar pontos quando necessário.
 *
 * EXEMPLOS:
 *
 * 1. Adicionar pontos ao clicar:
 *    clickFunction: (gameState) => {
 *      gameState.correctAnswer(); // +10 pontos
 *      return { type: SCENECHANGE, sceneName: "next" };
 *    }
 *
 * 2. Não adicionar pontos ao errar:
 *    clickFunction: (gameState) => {
 *      gameState.wrongAnswer(); // +0 pontos
 *      return { type: SCENECHANGE, sceneName: "try_again" };
 *    }
 *
 * 3. Adicionar pontos customizados:
 *    clickFunction: (gameState) => {
 *      gameState.addPoints(25); // +25 pontos
 *      return { type: SCENECHANGE, sceneName: "next" };
 *    }
 *
 * 4. Completar nível:
 *    clickFunction: (gameState) => {
 *      gameState.completeLevel(); // +50 pontos
 *      return { type: SCENECHANGE, sceneName: "victory" };
 *    }
 */
const sceneList: Record<string, Scene> = {
	desktop: new Scene({
		backgroundSpriteName: "blue_bg",
		gameObjects: [
			// ==========================================
			// EXEMPLO 1: Ícone sem pontuação (apenas navegação)
			// ==========================================
			new AppIcon({
				pos: new Position(16, 16),
				spriteName: "concepts_icon",
				appName: "Conceitos",
				// Sem clickFunction = apenas exibe console.log do nome
			}),

			// ==========================================
			// EXEMPLO 2: Ícone que muda de cena e adiciona pontos
			// ==========================================
			new AppIcon({
				pos: new Position(80, 16),
				spriteName: "email_icon",
				appName: "Treinamento",
				clickFunction: (gameState) => {
					// ⚠️ ATENÇÃO DESENVOLVEDOR:
					// Aqui você pode adicionar pontos quando o jogador clicar!

					// Exemplo: Adicionar 10 pontos ao entrar no treinamento
					gameState.correctAnswer(); // +10 pontos

					// Ou adicionar pontos customizados:
					// gameState.addPoints(15); // +15 pontos

					return { type: SCENECHANGE, sceneName: "email" };
				},
			}),

			// ==========================================
			// EXEMPLO 3: Ícone sem pontuação
			// ==========================================
			new AppIcon({
				pos: new Position(16, 80),
				spriteName: "settings_icon",
				appName: "Ajustes",
				// Não adiciona pontos
			}),

			// ==========================================
			// EXEMPLO 4: Ícone sem pontuação
			// ==========================================
			new AppIcon({
				pos: new Position(80, 80),
				spriteName: "saves_icon",
				appName: "Salvamentos",
				// Não adiciona pontos
			}),
		],
	}),

	// ==========================================
	// Cena de Email/Treinamento
	// ==========================================
	email: new Scene({
		backgroundSpriteName: "beige_bg",
		gameObjects: [
			// ⚠️ ATENÇÃO DESENVOLVEDOR:
			// Aqui você pode adicionar objetos (emails, botões, etc.)
			// e definir pontuação para cada um!
			//
			// EXEMPLO DE EMAIL CORRETO (dá pontos):
			// new AppIcon({
			//   pos: new Position(50, 50),
			//   spriteName: "email_icon",
			//   appName: "Email Seguro",
			//   clickFunction: (gameState) => {
			//     gameState.correctAnswer(); // +10 pontos
			//     return { type: SCENECHANGE, sceneName: "correct_feedback" };
			//   }
			// }),
			//
			// EXEMPLO DE EMAIL ERRADO (não dá pontos):
			// new AppIcon({
			//   pos: new Position(150, 50),
			//   spriteName: "email_icon",
			//   appName: "Phishing",
			//   clickFunction: (gameState) => {
			//     gameState.wrongAnswer(); // +0 pontos (não penaliza)
			//     return { type: SCENECHANGE, sceneName: "wrong_feedback" };
			//   }
			// }),
		],
	}),
};

export default sceneList;
