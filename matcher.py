from app import db, User
from random import sample

def getMatches(user, groupsize):
    potential_group =  list(User.query.filter_by(like1 = user.like1).all())
    potential_group += list(User.query.filter_by(like2 = user.like2).all())
    potential_group += list(User.query.filter_by(like3 = user.like3).all())

    if user in potential_group:
        potential_group.remove(user)

    print('\nMATCHER:', potential_group, '\n')

    if len(potential_group) >= groupsize:
        return sample(potential_group, groupsize)
    elif potential_group:
        return potential_group
    else:
        return sample(User.query.all(), groupsize)