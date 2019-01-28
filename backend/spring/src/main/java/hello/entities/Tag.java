package hello.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;

public class Tag {

    @JsonIgnore
    @Id
    public String id;

    public String name;

    public String icon;

    public Tag() {
    }

    public Tag(String name, String icon) {
        this.name = name;
        this.icon = icon;
    }

    @Override
    public String toString() {
        return String.format("Tag[id=%s, name='%s']", name);
    }

    @Override
    public boolean equals(Object obj) {
        if (obj != null)
            return (obj instanceof Tag) ? ((Tag) obj).id == this.id : false;
        else 
            return false;
    }

    @Override
    public int hashCode()
    {
        int hash = 7;
        hash = 37 * hash + Integer.parseInt(id);
        return hash;
    }
}