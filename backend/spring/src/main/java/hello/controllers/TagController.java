package hello.controllers;

import org.springframework.web.bind.annotation.RestController;

import hello.entities.Tag;
import hello.repositories.TagRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TagController {

    @Autowired
    private TagRepository tagRepository;

    @GetMapping("/tags")
    public List<Tag> findAllTags() {
        return tagRepository.findAll();
    }

    @PostMapping("/tags")
    public Tag update(@RequestBody Tag exp) {
        tagRepository.save(exp);
        return exp;
    }

    @PutMapping(value = "/tags")
    public Tag insert(@RequestBody Tag exp) {
        tagRepository.save(exp);
        return exp;
    }
    

}