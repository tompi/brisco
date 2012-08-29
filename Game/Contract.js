package com.brisco.Game;

import java.io.Serializable;

public class Contract implements Serializable {
	private static final long serialVersionUID = -1255676632324893250L;
	public int Level;
	public Suit Suit;
	public boolean Doubled;
	public boolean ReDoubled;
	public Direction Player;
	public int Tricks;
	public Card Lead;

	public Contract() {
	}

	public Contract(int level, Suit suit, boolean doubled, boolean redoubled,
			Direction player, int tricks) {
		Level = level;
		Suit = suit;
		Doubled = doubled;
		ReDoubled = redoubled;
		Player = player;
		Tricks = tricks;
	}

	public int OverTricks() {
		return Tricks - (Level + 6);
	}

	public boolean ContractMade() {
		return OverTricks() >= 0;
	}

	public boolean IsSmallSlam() {
		return Level == 6;
	}

	public boolean IsGrandSlam() {
		return Level == 7;
	}
}
