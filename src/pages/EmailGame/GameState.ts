import type Scene from "./Scenes/Scene";
import sceneList from "./Scenes/SceneList";

/**
 * GameState - Gerencia o estado do jogo incluindo pontuação
 *
 * COMO USAR PONTUAÇÃO:
 * Para adicionar pontos em qualquer lugar do código, use:
 *   gameState.addPoints(10) // Adiciona 10 pontos
 *   gameState.correctAnswer() // Adiciona pontos de resposta correta
 *   gameState.wrongAnswer() // Não adiciona pontos (erro não penaliza)
 */
export default class GameState {
	sceneList = sceneList;
	currentScene: Scene;

	// ============================================
	// SISTEMA DE PONTUAÇÃO
	// ============================================

	/**
	 * Pontuação atual do jogador
	 */
	score: number = 0;

	/**
	 * CONFIGURAÇÃO DE PONTOS
	 *
	 * ⚠️ ATENÇÃO DESENVOLVEDOR:
	 * Para alterar quantos pontos cada ação vale, MODIFIQUE AQUI:
	 */
	readonly POINTS = {
		CORRECT_ANSWER: 10,      // Pontos ao acertar uma resposta
		COMPLETE_LEVEL: 50,      // Pontos ao completar uma fase/nível
		CLICK_SAFE_LINK: 15,     // Pontos ao identificar link seguro
		AVOID_PHISHING: 20,      // Pontos ao evitar email de phishing
	};

	/**
	 * Adiciona pontos ao score
	 *
	 * EXEMPLO DE USO:
	 *   gameState.addPoints(10)  // Adiciona 10 pontos
	 *   gameState.addPoints(gameState.POINTS.CORRECT_ANSWER) // Adiciona pontos de resposta correta
	 *
	 * @param amount - Quantidade de pontos a adicionar
	 * @returns Pontuação total atual
	 */
	addPoints(amount: number): number {
		this.score += amount;
		return this.score;
	}

	/**
	 * Chamado quando o jogador acerta uma resposta
	 *
	 * EXEMPLO DE USO:
	 *   clickFunction: (gameState) => {
	 *     gameState.correctAnswer();
	 *     return { type: SCENECHANGE, sceneName: "next" };
	 *   }
	 */
	correctAnswer(): number {
		return this.addPoints(this.POINTS.CORRECT_ANSWER);
	}

	/**
	 * Chamado quando o jogador erra uma resposta
	 * Não adiciona nem remove pontos (erro não penaliza)
	 *
	 * EXEMPLO DE USO:
	 *   clickFunction: (gameState) => {
	 *     gameState.wrongAnswer();
	 *     return { type: SCENECHANGE, sceneName: "try_again" };
	 *   }
	 */
	wrongAnswer(): number {
		// Não adiciona nem remove pontos ao errar
		return this.score;
	}

	/**
	 * Chamado quando o jogador completa um nível/fase
	 *
	 * EXEMPLO DE USO:
	 *   gameState.completeLevel();
	 */
	completeLevel(): number {
		return this.addPoints(this.POINTS.COMPLETE_LEVEL);
	}

	/**
	 * Reseta a pontuação para zero
	 * Use quando iniciar novo jogo ou reiniciar
	 */
	resetScore(): void {
		this.score = 0;
	}

	// ============================================

	constructor(args: { sceneName: string }) {
		this.currentScene = this.sceneList[args.sceneName];
	}
}
