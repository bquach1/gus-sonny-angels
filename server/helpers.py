def check_weird_caps(s):
    if ' ' in s:
        return s
    
    new_string = [s[0]]
    for char in s[1:]:
        if char.isupper():
            new_string.append(' ')
        new_string.append(char)
    
    return ''.join(new_string)