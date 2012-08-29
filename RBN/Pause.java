package com.brisco.RBN;

// NB: Custom extension to RBN
public class Pause extends RBNLine {
	@Override
	public String GetRBNString() {
		return "";
	}

	@Override
	public void ParseRBNString(String rbn) {
	}

	@Override
	public RBNLineType GetRBNLineType() {
		return RBNLineType.Pause;
	}

}
