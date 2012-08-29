package com.brisco.Game;

public enum Direction {
	North,
	South,
	East,
	West;
	
	public boolean IsNorthSouth()
	{
		return (this == North || this == South);
	}
}
