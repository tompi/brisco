package com.brisco.PBN;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import com.brisco.PBN.Game.Game;
import com.brisco.PBN.Mapping.GameMapper;

public class Parser {
	public static ArrayList<Game> ReadPBN(InputStream pbnFile) {
		// TODO:
		// Open file
		// Read lines
		// Split lines into PBN-Games
		return null;
	}

	public static StringBuilder WritePBN(List<Game> games) {
		StringBuilder pbn = new StringBuilder();
		for (Game g : games) {
			GameMapper.AppendGame(pbn, g);
		}
		return pbn;
	}
}
