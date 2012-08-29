package com.brisco.HTML.Mapping;

import com.brisco.Game.Suit;

public class SuitMapper {
	public static String GetStringFromSuit(Suit suit) {
		switch (suit) {
		case Spades:
			return "&spades;";
		case Hearts:
			return "<span class=\"red\">&hearts;</span>";
		case Diamonds:
			return "<span class=\"red\">&diams;</span>";
		case Clubs:
			return "&clubs;";
		default:
			return "NT";
		}
	}
}
