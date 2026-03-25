package com.hpimstech.inventory.service;

import com.hpimstech.inventory.model.Product;
import com.hpimstech.inventory.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    //logic to add the product
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    //logic to see all the products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    //logic to get the product by id
    public Product getProductById(Long id) {
        Optional<Product> product = productRepository.findById(id);
        return product.orElse(null);
    }

    //logic to update the product
    public Product updateProduct(Long id, Product updatedProduct) {
        Product existingProduct = getProductById(id);

        if (existingProduct != null) {
            existingProduct.setName(updatedProduct.getName());
            existingProduct.setPrice(updatedProduct.getPrice());
            existingProduct.setQuantity(updatedProduct.getQuantity());
            existingProduct.setCategory(updatedProduct.getCategory());

            return productRepository.save(existingProduct);
        }

        return null;
    }

    //logic to delete the product
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    //details about selling
    public String sellProduct(Long id, int quantity) {
        Product product = getProductById(id);

        if (product == null) {
            return "Product not found";
        }

        if (product.getQuantity() < quantity) {
            return "Not enough stock";
        }

        product.setQuantity(product.getQuantity() - quantity);
        productRepository.save(product);

        return "Product sold successfully";
    }
}