package org.ani.zation.service;

import java.util.List;

public class GiftItemDTO {

	private List<String> images;
	private String title;
	private String externalURL;

	public GiftItemDTO(String title, List<String> images, String externalURL) {
		this.setTitle(title);
		this.setImages(images);
		this.setExternalURL(externalURL);
	}

	public List<String> getImages() {
		return images;
	}

	public void setImages(List<String> images) {
		this.images = images;
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