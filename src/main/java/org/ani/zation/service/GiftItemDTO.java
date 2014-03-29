package org.ani.zation.service;

public class GiftItemDTO {

	private String image;
	private String title;

	public GiftItemDTO(String title, String image) {
		this.setTitle(title);
		this.setImage(image);
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
}
