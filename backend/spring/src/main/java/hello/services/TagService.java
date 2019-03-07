package hello.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hello.entities.Tag;
import hello.repositories.TagRepository;

@Service
public class TagService {

    @Autowired
    TagRepository tagRepository;

    public void save(Tag tag) {
        tagRepository.save(tag);
    }

}