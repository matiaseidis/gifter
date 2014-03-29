package org.ani.zation.service;

public class GiftItemDTO {

	private String image;
	private String title;
	private String externalURL;

	public GiftItemDTO(String title, String image, String externalURL) {
		this.setTitle(title);
		this.setImage(image);
		this.setExternalURL(externalURL);
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

	public String getExternalURL() {
		return externalURL;
	}

	public void setExternalURL(String externalURL) {
		this.externalURL = externalURL;
	}
}
