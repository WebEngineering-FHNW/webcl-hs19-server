package pep

class Developer {

    String firstName
    String lastName
    String imageUrl

    String toString() { "$firstName $lastName" }

    static constraints = {
        firstName nullable: true
        lastName  nullable: true
        imageUrl  nullable: true, url: true
    }
}
