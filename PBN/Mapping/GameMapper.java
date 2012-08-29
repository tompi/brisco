package com.brisco.PBN.Mapping;

import java.io.InputStream;

import com.brisco.PBN.Game.Auction;
import com.brisco.PBN.Game.Game;

public class GameMapper {

	public static Game GetGameFromStream(InputStream identification) {
		// TODO
		return null;
	}

	public static void AppendGame(StringBuilder pbn, Game game) {
		if (game == null) {
			return;
		}
		// Each game should start with empty line:
		pbn.append('\n');
		IdentificationMapper.AppendIdentification(pbn, game.Identification);
		if (game.Auction == null) {
			game.Auction = new Auction();
			game.Auction.Auction = new com.brisco.Game.Auction(
					game.Identification.Dealer);
		}
		AuctionMapper.AppendAuction(pbn, game.Auction);
		// TODO: PlayMapper
		SupplementalMapper.AppendSupplemental(pbn, game.Supplemental);
	}
}
